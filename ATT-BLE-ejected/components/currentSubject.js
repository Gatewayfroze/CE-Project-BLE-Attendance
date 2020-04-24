import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native'
import API from '../assets/API'
import Colors from '../constants/Colors'
import { AntDesign } from '@expo/vector-icons';
import {BleManager} from 'react-native-ble-plx';
const manager = new BleManager();

const CurrentSubject = ({ currentUser, checkOut }, ...props) => {
    const [curTime, setTime] = useState(
        new Date().toLocaleTimeString()
    )
    const [loading, setLoading] = useState(false)
    const [BLEstatus, setBLEStatus] = useState(true)
    // ถ้า BLE status == true จะกด check out ได้
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
        setLoading(true)
        API.post('getCurrentSubject', { uid: currentUser.uid })
            .then((res) => {
                res.data.endTime = new Date(res.data.endTime);
                setCurrentSubject(res.data);
                console.log(res.data)
                setLoading(false)
            })
    }
    const convertDateStr = (currentDate) => {
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        let dateString = `${day}/${month}/${year}`
        return 'หมดเวลา: ' + dateString + ' ' + currentDate.toLocaleTimeString()
    }
    const findBLE = () => {
        console.log('kuy')
        setLoading(true)

        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
              console.log(error.message);
              return;
            }
            if (device.id == '24:0A:C4:AA:CD:32' || device.id == '30:AE:A4:F7:4C:F2' ) {
                console.log("yay")
                manager.stopDeviceScan();
                setLoading(false)  
                clearTimeout(time);
                setBLEStatus(true)  
                   
            }
          });
        
          time = setTimeout(() => {
            manager.stopDeviceScan();
            console.log("not found");
            setBLEStatus(false);
            setLoading(false);
          }, 5000);
    }
    return (
        <ScrollView refreshControl={<RefreshControl color={Colors.primaryColor} refreshing={loading} onRefresh={findBLE} />}> 
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

                <TouchableOpacity style={{ ...styles.button, ...BLEstatus && (currentSubject.endTime && new Date() > currentSubject.endTime) ? { backgroundColor: Colors.primaryColor } : { backgroundColor: 'grey' } }}
                    disabled={!BLEstatus || (currentSubject.endTime && new Date() > currentSubject.endTime ? false : true)}
                    onPress={checkOut}>
                    <Text style={{ color: 'white' }}>Check out</Text>
                </TouchableOpacity >
            </View >
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 22
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