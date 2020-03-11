import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    AsyncStorage,
    RefreshControl
} from 'react-native'
import Button from '../components/button'
import SubjectStat from '../components/subjectStat'
import Colors from '../constants/Colors'
import API from '../assets/API'
import * as firebase from 'firebase';
import 'firebase/firestore';
import { config } from '../firebase';

const StatScreen = ({ navigation }, ...props) => {
    const [currentUser, setCurrentUser] = useState('');
    const [subjectsID, setSubjectsID] = useState([])
    const [subjectsDetail, setSubjectsDetail] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentSubject, setCurrentSubject] = useState({})
    useEffect(() => {
        getToken()
    }, []);

    useEffect(() => {
        if (currentUser !== '') {
            getUserSubject()
            getCurrentSubject()
        }
    }, [currentUser])
    useEffect(() => {
        if (currentUser !== '' && subjectsID !== []) {
            getSubjectDetail()
            console.log('fecth data Detail')
        }
    }, [subjectsID])

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
                console.log(res.data)
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
        setSubjectsDetail(results)
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
            date.setHours(start.getHours())
            date.setMinutes(start.getMinutes())
            date.setSeconds(start.getSeconds())
            const now = new Date()
            // เวลาไม่เกินคาบครึ่งชม.
            if (diff_minutes(now, date) < 30)
                return { date: date, start: new Date(sch.start), end: new Date(sch.end), schIndex: sch.schIndex }
        })
        currentSche = currentSche.filter((sch) => sch !== undefined)
        return currentSche
    }
    const sendCheckIn = (transaction) => {
        console.log('eiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
        console.log(transaction)
        API.post('createTransaction/', transaction)
            .then((res) => {
                getCurrentSubject();
                console.log(res)
            })
            .catch((err) =>
                console.log(err))
    }
    const checkOut = () => {
        API.post('setCurrentSubject/', { uid: currentUser.uid, currentSubject: {} })
            .then((res) => { getCurrentSubject(); console.log(res) })
            .catch((err) => console.log(err))
    }


    return (
        <View style={styles.screen}>
            <ScrollView refreshControl={<RefreshControl color={Colors.primaryColor} refreshing={loading} onRefresh={getUserSubject} />}>
                {subjectsDetail.map((subject, i) => {
                    // check when schedule =0
                    const currentSch = currentSchedule(subject.schedule)[0]
                    let strDetail = ''
                    let objTransac = {}
                    let isDisable = true
                    if (currentSch != undefined) {
                        const currentDate = currentSch.date
                        const startTime = currentSch.start.toLocaleTimeString('en-GB').slice(0, -3)
                        const endTime = currentSch.end.toLocaleTimeString('en-GB').slice(0, -3)
                        // set for text 
                        const day = currentDate.getDate()
                        const month = currentDate.getMonth() + 1
                        const year = currentDate.getFullYear()
                        let dateString = `${day}/${month}/${year}`
                        const now = new Date()
                        objTransac = {
                            subjectID: subject.subjectID,
                            uid: currentUser.uid,
                            schIndex: currentSch.schIndex,
                            timestamp: now,
                            status: diff_minutes(now, currentDate) <= 15 ? 'ok' : 'late',
                            uniqueID: '',
                            endTime: currentSch.end
                        }
                        // console.log(objTransac)
                        strDetail = `${dateString} ${startTime}-${endTime} น.`
                        isDisable = Math.abs(diff_minutes(now, currentDate)) > 30 ? true : false
                    }
                    return <SubjectStat key={i} title={subject.subjectName} detail={strDetail} onClick={() => {
                        navigation.navigate('statDetail', {
                            subjectID:subject.subjectID,
                            subjectName:subject.subjectName,
                            uid:currentUser.uid
                        }
                        )
                    }} />
                })}
            </ScrollView>
        </View>
    )
}
StatScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Select Subject to View Stat'
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
export default StatScreen