import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  RefreshControl
} from "react-native";
import { showMessage } from "react-native-flash-message";
import {BleManager} from 'react-native-ble-plx';

import SubjectCheckIn from "../components/subjectCheckIn";
import CurrentSubject from "../components/currentSubject";
import Color from "../constants/Colors";
import API from "../assets/API";
import DeviceInfo from 'react-native-device-info';
const manager = new BleManager();
const CheckInScreen = props => {
  const [currentUser, setCurrentUser] = useState("");
  const [subjectsID, setSubjectsID] = useState([]);
  const [subjectsDetail, setSubjectsDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [BLEstatus, setBLEStatus] = useState("");
  const [currentSubject, setCurrentSubject] = useState({});
  const [componentData, setCompData] = useState([]);
  const [uniqueID, setUniqueID] = useState('') 
  
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (currentUser !== '') {
      let uniqueId = DeviceInfo.getUniqueId();
      setUniqueID(uniqueId)
    }
  }, [currentUser])

  useEffect(() => {
    if (uniqueID !== '') {
      getUserSubject()
      getCurrentSubject()
    }
  }, [uniqueID])

  useEffect(() => {
    if (currentUser !== "" && subjectsID !== []) {
      getSubjectDetail();
    }
  }, [subjectsID]);

  useEffect(() => {
    if (subjectsDetail.length !== 0) {
      setLoading(true);
      //console.log("find BLEEEEEEEEEEEEEEEEEEEEEEE");
      const comp = genComponentData();
      setCompData(comp);
      
      console.log("aaaaa");
      //console.log(comp[0]);
      var num = new Array();
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log(error.message);
          return;
        }
        
        

        if (device.id == comp[0].mac) {
          clearTimeout(time);
          num.push(Math.pow(10, (-62 - device.rssi) / 20));
          if (num.length == 20) {
            clearTimeout(time);
            manager.stopDeviceScan();
            const result = num.reduce((sum, number) => {
              return sum + number / num.length;
            }, 0);
            console.log(result)

            if(result > 15){
              console.log('not in range')
              setBLEStatus(true);
              setLoading(false);

            }else if(result<=15){
              console.log('in range')
              setBLEStatus(false);
              setLoading(false);
            }
            console.log(
              device.name + " : " + device.serviceUUIDs + " : " + result
            );            
          }          
        }
      });
     
      time = setTimeout(() => {
        manager.stopDeviceScan();
        console.log("not found");
        setBLEStatus(true);
        setLoading(false);
      }, 10000);
    }
  }, [subjectsDetail]);

  // -----------------------------------------------------------------------------
  getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      setCurrentUser(data.user);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  const objIsEmpty = obj => {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  };
  const diff_minutes = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.round(diff);
  };
  // --------------------------------- API----------------------------------------------------------------
  const getUserSubject = () => {
    setLoading(true);
    API.post("getSubjectByID/", { uid: currentUser.uid })
      .then(res => {
        // console.log(res.data)
        setCompData([]);
        setSubjectsID(res.data);
      })
      .catch(err => console.log(err));
  };

  const getCurrentSubject = () => {
    API.post("getCurrentSubject/", { uid: currentUser.uid })
      .then(res => setCurrentSubject(res.data))
      .catch(err => console.log(err));
  };
  const getSubjectDetail = async () => {
    setSubjectsDetail([]);
    const subDetail = subjectsID.map(async subject => {
      const res = await API.post("getSubject/", { subjectID: subject });
      const detail = await res.data;
      return { ...detail, subjectID: subject };
    });
    const results = await Promise.all(subDetail);
    setLoading(false);
    let data = results.map(schDetail => {
      const currentSch = currentSchedule(schDetail.schedule);
      return { ...schDetail, schedule: currentSch };
    });
    // console.log(data)
    data = data.sort((a, b) => {
      return a.schedule[0].date - b.schedule[0].date;
    });
    setSubjectsDetail(data);
  };

  const currentSchedule = scheduleSubject => {
    const schedule = scheduleSubject
      // sort Date
      .sort((a, b) => {
        var dateA = new Date(a.date),
          dateB = new Date(b.date);
        return dateA - dateB; //sort by date ascending
      });
    let currentSche = schedule.map(sch => {
      let date = new Date(sch.date);
      const start = new Date(sch.start);
      // +7 time zoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
      // date.setHours(start.getHours())
      // date.setMinutes(start.getMinutes())
      // date.setSeconds(start.getSeconds())
      const now = new Date();
      // เวลาไม่เกินคาบครึ่งชม.
      if (diff_minutes(now, date) < 30)
        return {
          date: date,
          start: new Date(sch.start),
          end: new Date(sch.end),
          schIndex: sch.schIndex,
          mac: sch.mac,
          board: sch.board
        };
    });
    currentSche = currentSche.filter(sch => sch !== undefined);
    return currentSche;
  };
  const sendCheckIn = (transaction, subjectName) => {
    // console.log(transaction)

    API.post("createTransaction/", { ...transaction, subjectName })
      .then(res => {
        getCurrentSubject();
        showMessage({
          message: `Checked In ${subjectName}`,
          type: "success"
        });
      })
      .catch((err) => { 
        showMessage({ 
          message: `${err.message}`, 
          type: "error", 
        }); 
      }) 
  };
  const checkOut = () => {
    API.post("checkout/", { uid: currentUser.uid })
      .then(res => {
        getCurrentSubject();
        //console.log(res);
      })
      .catch(err => console.log(err));
  };
  
  const genComponentData = () => {
    const compData = subjectsDetail.map((subject, i) => {
      // check when schedule =0
      const currentSch = subject.schedule[0];
      let strDetail = "";
      let objTransac = {};
      let isDisable = true;
      let room = "";
      let mac = "";
      if (currentSch != undefined) {
        // console.log("kuy "+currentSch.mac)
        room = currentSch.board.label;
        mac = currentSch.mac;
        //console.log(currentSch.mac)
        const currentDate = currentSch.date;
        const startTime = currentSch.start
          .toLocaleTimeString("en-GB")
          .slice(0, -3);
        const endTime = currentSch.end.toLocaleTimeString("en-GB").slice(0, -3);
        // set for text
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        let dateString = `${day}/${month}/${year}`;
        const now = new Date();
        // console.log(now)
        // console.log(currentDate)
        // console.log(diff_minutes(now, currentDate))
        objTransac = {
          subjectID: subject.subjectID,
          uid: currentUser.uid,
          schIndex: currentSch.schIndex,
          timestamp: now,
          status: diff_minutes(now, currentDate) <= 15 ? "ok" : "late",
          uniqueID: uniqueID,
          endTime: currentSch.end,
          mac: mac
        };
        //console.log(objTransac);
        strDetail = `${dateString} ${startTime}-${endTime} น.`;
         isDisable = Math.abs(diff_minutes(now, currentDate)) > 30 && !BLEstatus ? true : false
        // isDisable = BLEstatus;
      }
      return {
        subjectName: subject.subjectName,
        strDetail,
        objTransac,
        isDisable,
        room,
        mac
      };
    });
    return compData;
  };

  return (
    <View style={styles.screen} navigation={props.navigation}>
      {/* โชว์ status ที่กำลังเรียนอยู่ปัจจุบัน */}
      {/* <CurrentSubject/> */}
      {objIsEmpty(currentSubject) ? (
        <React.Fragment>
          <View
            style={{
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 18 }}>
              กดปุ่ม CheckIn เพื่อเช็คชื่อในรายวิชาที่เลือก
            </Text>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                color={Color.primaryColor}
                refreshing={loading}
                onRefresh={getUserSubject}
              />
            }
          >
            {componentData.map((subject, i) => {
              return (
                <SubjectCheckIn
                  key={i}
                  disabled={BLEstatus || subject.isDisable}
                  title={subject.subjectName}
                  room={subject.room}
                  detail={subject.strDetail}
                  sendTransaction={() =>
                    sendCheckIn(subject.objTransac, subject.subjectName)
                  }
                />
              );
            })}
          </ScrollView>
        </React.Fragment>
      ) : (
        <CurrentSubject currentUser={currentUser} checkOut={() => checkOut()} />
      )}
    </View>
  );
};
CheckInScreen.navigationOptions = navData => {
  return {
    headerTitle: "ATTENDA   "
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 10
  },
  text: {}
});
export default CheckInScreen;
