import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import API from '../assets/API'
import Colors from '../constants/Colors'
import { AntDesign } from '@expo/vector-icons';

const CurrentSubject = ({ currentUser, checkOut }, ...props) => {
    const [curTime, setTime] = useState(
        new Date().toLocaleTimeString()
    )
    const [currentSubject, setCurrentSubject] = useState('')
    useEffect(() => {
        getCurrentSubject()
    }, [])
    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)
    })
    useEffect(() => {
        if (currentSubject !== '') {
            console.log(typeof currentSubject.endTime)
            console.log(currentSubject.endTime.toString())
        }
    }, [currentSubject])
    const getCurrentSubject = () => {
        API.post('getCurrentSubject', { uid: currentUser.uid }).then((res) => { res.data.endTime = new Date(res.data.endTime); setCurrentSubject(res.data); console.log(res.data) })
    }
    const convertDateStr = (currentDate) => {
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        let dateString = `${day}/${month}/${year}`
        return 'หมดเวลา: ' + dateString + ' ' + currentDate.toLocaleTimeString()
    }
    return (
        <View style={styles.currentSubjectContainer}>
            <Text style={styles.title}>{`กำลังเรียน: ${currentSubject.subjectName}`}</Text>
            <View style={styles.clockContainer}>
                <AntDesign name="clockcircleo"
                    size={30} color='gray'
                    style={{ paddingRight: 10 }}
                />
                <Text style={styles.time}>{curTime}</Text>
            </View>
            <Text style={styles.endTime}>{currentSubject.endTime ? convertDateStr(currentSubject.endTime) : ''}</Text>

            <TouchableOpacity style={{ ...styles.button, ...currentSubject.endTime && new Date() > currentSubject.endTime ? { backgroundColor: Colors.primaryColor } : { backgroundColor: 'grey' } }}
                disabled={currentSubject.endTime && new Date() > currentSubject.endTime ? false : true}
                onPress={checkOut}>
                <Text style={{ color: 'white' }}>Check out</Text>
            </TouchableOpacity >
        </View >
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 30
    },
    time: {
        fontSize: 40,
        color: Colors.highLigthColor
    },
    endTime: {
        fontSize: 18,
        color: Colors.secondaryColor
    },
    button: {
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
        width: 100,
        marginHorizontal: 20,
    },
    clockContainer: {
        backgroundColor: '#ebebeb',
        borderRadius: 10,
        width: '80%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    currentSubjectContainer: {
        height: 300,
        borderRadius: 15,
        padding: 5,
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: "space-between",
        paddingVertical: 40,
        alignItems: "center",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
    }
})
export default CurrentSubject