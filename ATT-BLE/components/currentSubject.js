import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import API from '../assets/API'
import Colors from '../constants/Colors'
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
        console.log({ uid: currentUser.uid })
        API.post('getCurrentSubject', { uid: currentUser.uid }).then((res) => { res.data.endTime = new Date(res.data.endTime); setCurrentSubject(res.data) })
    }
    return (
        <View style={styles.currentSubjectContainer}>
            <Text style={styles.title}>{currentSubject.subjectID}</Text>
            <Text style={styles.time}>{curTime}</Text>
            <Text>{currentSubject.endTime ? currentSubject.endTime.toString() : ''}</Text>
            <Button onPress={checkOut} title='Check out' disabled={currentSubject.endTime && new Date() > currentSubject.endTime ? false : true}></Button>
        </View>
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
    currentSubjectContainer: {
        height: 200,
        borderRadius: 15,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: "center",
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