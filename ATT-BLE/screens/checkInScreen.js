import React, {
  useState,
  useEffect,
  useReducer,
} from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Button,
  ActivityIndicator
} from 'react-native'
import SubjectCheckIn from '../components/subjectCheckIn'
import CurrentSubject from '../components/currentSubject'
import Color from '../constants/Colors'
import API from '../assets/API'
import { TouchableHighlight } from 'react-native-gesture-handler'
const CheckInScreen = props => {
  const [currentUser, setCurrentUser] = useState('');
  const [subjectsID, setSubjectsID] = useState([])
  const [subjectsDetail, setSubjectsDetail] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getToken()
  }, []);

  useEffect(() => {
    if (currentUser !== '') {
      getUserSubject()
    }
  }, [currentUser])
  useEffect(() => {
    if (currentUser !== '') {
      getSubjectDetail()
    }
  }, [subjectsID])

  getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      setCurrentUser(data.user)
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  const getUserSubject = () => {
    setLoading(true)
    API.post('getSubjectByID/', { uid: currentUser.uid })
      .then((res) => {
        console.log(res.data)
        setSubjectsID(res.data)
      })
      .catch((err) =>
        console.log(err))
  }

  const getSubjectDetail = async () => {
    const subjectsDetail = subjectsID.map(async (subject) => {
      const res = await API.post('getSubject/', { subjectID: subject })
      const detail = await res.data
      return detail
    })
    const results = await Promise.all(subjectsDetail)
    setSubjectsDetail(results)
    setLoading(false)
  }
  const currentSchedule = (scheduleSubject) => {
    const schedule = scheduleSubject
      .sort((a, b) => {
        // sort Date
        var dateA = new Date(a.date), dateB = new Date(b.date)
        return dateA - dateB //sort by date ascending
      })
    let currentSche = schedule.map((sch) => {
      const date = new Date(sch.date)
      const now = new Date()
      // เดี๋ยวต้องมาเช็คที่เวลากันอีก 
      if (date > now)
        return { date: date, start: new Date(sch.start), end: new Date(sch.end) }
    })
    currentSche = currentSche.filter((sch) => sch !== undefined)
    return currentSche
  }
  return (
    <View style={styles.screen} navigation={props.navigation}>
      <View style={{ marginHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: 'TH-sarabun', fontSize: 25 }}>กดปุ่ม CheckIn เพื่อเช็คชื่อในรายวิชาที่เลือก</Text>
        <Text style={{ fontFamily: 'TH-sarabun', fontSize: 25 }}>{currentUser.email}</Text>
      </View>
      {/* โชว์ status ที่กำลังเรียนอยู่ปัจจุบัน */}
      {/* <CurrentSubject/> */}
      <ScrollView>
        {loading && <ActivityIndicator size="large" color={Color.primaryColor} />}
        {subjectsDetail.map((subject, i) => {
          const currentDate = currentSchedule(subject.schedule)[0].date
          const startTime = currentSchedule(subject.schedule)[0].start.toLocaleTimeString('en-GB').slice(0, -3)
          const endTime = currentSchedule(subject.schedule)[0].end.toLocaleTimeString('en-GB').slice(0, -3)
          const day = currentDate.getDate()
          const month = currentDate.getMonth() + 1
          const year = currentDate.getFullYear()
          let dateString = `${day}/${month}/${year}`

          return <SubjectCheckIn key={i} title={subject.subjectName} detail={`${dateString} ${startTime}-${endTime} น.`} />
        })}
        {/* {subjects.map((subject)=>{

        })} */}
        {/* <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: จ. 07:30-12:00 น.' onClick={() => {
          props.navigation.navigate({
            routeName: 'statDetail'
          })
        }
        } />
        <SubjectCheckIn title='Image Processing' detail='เวลาเรียน: จ. 07:30-12:00 น.' />
        <SubjectCheckIn title='Data Minining' detail='เวลาเรียน: อ. 07:30-12:00 น.' />
        <SubjectCheckIn disabled={true} title='Advance Digital' detail='เวลาเรียน: พฤ. 07:30-12:00 น.' />
        <SubjectCheckIn disabled={true} title='Human computer interaction' detail='เวลาเรียน: พ. 07:30-12:00 น.' /> */}
      </ScrollView>
    </View>
  )
}
CheckInScreen.navigationOptions = navData => {
  return {
    headerTitle: 'ATTENDA'
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
    fontFamily: 'TH-sarabun'
  },

});
export default CheckInScreen
