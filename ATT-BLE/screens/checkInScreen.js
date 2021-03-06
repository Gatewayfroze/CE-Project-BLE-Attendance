import React, {
  useState,
  useEffect,
} from 'react'

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  RefreshControl
} from 'react-native'
import { showMessage } from "react-native-flash-message";

import SubjectCheckIn from '../components/subjectCheckIn'
import CurrentSubject from '../components/currentSubject'
import Color from '../constants/Colors'
import API from '../constants/API'
const CheckInScreen = props => {
  const [currentUser, setCurrentUser] = useState('');
  const [subjectsID, setSubjectsID] = useState([])
  const [subjectsDetail, setSubjectsDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const [BLEstatus, setBLEStatus] = useState(false)
  const [currentSubject, setCurrentSubject] = useState({})
  const [componentData, setCompData] = useState([])
  const [uniqueID, setUniqueID] = useState('')
  useEffect(() => {
    getToken()
  }, []);
  useEffect(() => {
    if (currentUser !== '') {
      // get uid ตรงนี้
      setUniqueID('aaa')
    }
  }, [currentUser])
  useEffect(() => {
    if (uniqueID !== '') {
      getUserSubject()
      getCurrentSubject()
    }
  }, [uniqueID])
  useEffect(() => {
    if (currentUser !== '' && subjectsID !== []) {
      getSubjectDetail()
    }
  }, [subjectsID])

  useEffect(() => {
    if (subjectsDetail.length !== 0) {
      setLoading(true)
      const comp = genComponentData()
      setCompData(comp)
      console.log(comp[0].mac)
      // ========================================================BLE is here 
      // ใช้ subject Data [0].mac หาไปก่อน 
      // เอาพอหอเสร็จ ตั้ง state ให้ BLE stauts แล้วเอาไปเช็คเงื่อนไข isDisable ที่ function  genComponentData()
      setTimeout(() => {
        setBLEStatus(true)
        setLoading(false)
      }, 100)
    }
  }, [subjectsDetail])

  // -----------------------------------------------------------------------------
  getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      setCurrentUser(data.user)
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  const objIsEmpty = (obj) => {
    return Object.entries(obj).length === 0 && obj.constructor === Object
  }
  const diff_minutes = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.round(diff);
  }
  // --------------------------------- API----------------------------------------------------------------
  const getUserSubject = () => {
    setLoading(true)
    API.post('getSubjectByID/', { uid: currentUser.uid })
      .then((res) => {
        setCompData([])
        setSubjectsID(res.data)
      })
      .catch((err) =>
        console.log(err))
  }

  const getCurrentSubject = () => {
    API.post('getCurrentSubject/', { uid: currentUser.uid })
      .then(res => setCurrentSubject(res.data))
      .catch(err => console.log(err))
  }
  const getSubjectDetail = async () => {
    setSubjectsDetail([])
    const subDetail = subjectsID.map(async (subject) => {
      const res = await API.post('getSubject/', { subjectID: subject })
      const detail = await res.data
      return { ...detail, subjectID: subject }
    })
    const results = await Promise.all(subDetail)
    setLoading(false)
    let data = results.map((schDetail) => {
      const currentSch = currentSchedule(schDetail.schedule)
      return { ...schDetail, schedule: currentSch }
    })
    // console.log(data)
    data = data.sort((a, b) => {
      return a.schedule[0].date - b.schedule[0].date
    })
    setSubjectsDetail(data)
  }

  const currentSchedule = (scheduleSubject) => {
    const schedule = scheduleSubject
      // sort Date
      .sort((a, b) => {
        var dateA = new Date(a.date), dateB = new Date(b.date)
        return dateA - dateB //sort by date ascending
      })
    let currentSche = schedule.map((sch) => {
      let date = new Date(sch.date)
      const start = new Date(sch.start)
      // +7 time zoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
      // date.setHours(start.getHours())
      // date.setMinutes(start.getMinutes())
      // date.setSeconds(start.getSeconds())
      const now = new Date()
      // เวลาไม่เกินคาบครึ่งชม.
      if (diff_minutes(now, date) < 30)
        return { date: date, start: new Date(sch.start), end: new Date(sch.end), schIndex: sch.schIndex, mac: sch.mac, board: sch.board }
    })
    currentSche = currentSche.filter((sch) => sch !== undefined)
    return currentSche
  }
  const sendCheckIn = (transaction, subjectName) => {
    // console.log(transaction)
    console.log('yay')
    API.post('createTransaction/', { ...transaction, subjectName })
      .then((res) => {
        getCurrentSubject();
        showMessage({
          message: `Checked In ${subjectName}`,
          type: "success",
        });
      })
      .catch((err) => {
        if (err.response.status == 500) {
          showMessage({
            message: `Check In device duplicated`,
            type: "error",
          });
        }
      })
  }
  const checkOut = () => {
    API.post('checkout/', { uid: currentUser.uid })
      .then((res) => { getCurrentSubject(); console.log(res) })
      .catch((err) => console.log(err))
  }
  const findBLE = () => {
    return true
  }
  const genComponentData = () => {
    const compData = subjectsDetail.map((subject, i) => {
      // check when schedule =0
      const currentSch = subject.schedule[0]
      let strDetail = ''
      let objTransac = {}
      let isDisable = true
      let room = ''
      let mac = ''
      if (currentSch != undefined) {
        room = currentSch.board.label
        mac = currentSch.mac
        const currentDate = currentSch.date
        const startTime = currentSch.start.toLocaleTimeString('en-GB').slice(0, -3)
        const endTime = currentSch.end.toLocaleTimeString('en-GB').slice(0, -3)
        // set for text 
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        let dateString = `${day}/${month}/${year}`
        const now = new Date()
        // console.log(now)
        // console.log(currentDate)
        // console.log(diff_minutes(now, currentDate))
        objTransac = {
          subjectID: subject.subjectID,
          uid: currentUser.uid,
          schIndex: currentSch.schIndex,
          timestamp: now,
          status: diff_minutes(now, currentDate) <= 15 ? 'ok' : 'late',
          uniqueID: uniqueID,
          endTime: currentSch.end,
          mac: mac
        }
        console.log(objTransac)
        strDetail = `${dateString} ${startTime}-${endTime} น.`
        isDisable = Math.abs(diff_minutes(now, currentDate)) > 30
        // isDisable = Math.abs(diff_minutes(now, currentDate)) > 30 && !findBLE(currentSch.mac) ? true : false
        // isDisable = false
      }
      return { subjectName: subject.subjectName, strDetail, objTransac, isDisable, room, mac }
    })
    return compData
  }

  return (
    <View style={styles.screen} navigation={props.navigation}>

      {/* โชว์ status ที่กำลังเรียนอยู่ปัจจุบัน */}
      {/* <CurrentSubject/> */}
      {objIsEmpty(currentSubject) ?
        <React.Fragment>
          <View style={{ marginHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>กดปุ่ม CheckIn เพื่อเช็คชื่อในรายวิชาที่เลือก</Text>
          </View>
          <ScrollView refreshControl={<RefreshControl color={Color.primaryColor} refreshing={loading} onRefresh={getUserSubject} />}>
            {
              componentData.map((subject, i) => {
                // เอา disable ออกไปไว้เทส
                return <SubjectCheckIn key={i} disabled={subject.isDisable} title={subject.subjectName} room={subject.room} detail={subject.strDetail} sendTransaction={() => sendCheckIn(subject.objTransac, subject.subjectName)} />
                // return <SubjectCheckIn key={i} disabled={!BLEstatus || subject.isDisable} title={subject.subjectName} room={subject.room} detail={subject.strDetail} sendTransaction={() => sendCheckIn(subject.objTransac, subject.subjectName)} />
              })}
          </ScrollView>
        </React.Fragment>
        :
        <CurrentSubject currentUser={currentUser} checkOut={() => checkOut()} />
      }
    </View>
  )
}
CheckInScreen.navigationOptions = navData => {
  return {
    headerTitle: 'ATTENDA   '
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10
  },
  text: {
  },

});
export default CheckInScreen
