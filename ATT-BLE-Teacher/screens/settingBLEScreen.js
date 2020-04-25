import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native'


import CheckBox from 'react-native-check-box'
import Select from 'react-native-picker-select';
import Colors from '../constants/Colors'
import Button from '../components/button'
import API from '../assets/API'
import { showMessage } from "react-native-flash-message";

const settingScreen = ({ navigation }, ...props) => {
    const room = navigation.state.params.room
    const mac = navigation.state.params.mac
    const subjectList = navigation.state.params.subjectsDetail.map((data) => {
        return { label: data.subjectName, value: data.subjectID }
    })

    const [selectedSubject, setSelectedSubject] = useState(null)
    const [schData, setScheData] = useState([])
    const [renderData, setRenderData] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    const [schedule, setSchedule] = useState([])
    const [tickker, setTrickker] = useState()
    useEffect(() => {
        if (selectedSubject !== null) {
            fetchSubject()
        }
    }, [selectedSubject, tickker])
    useEffect(() => {
        console.log('renderData')
        setRenderData(schData)
    }, [schData])
    const fetchSubject = () => {
        API.post('getSubject/', { subjectID: selectedSubject })
            .then((res) => {
                const temp = res.data.schedule.map((sch) => {
                    return { date: convertDateStr(sch.date), room: sch.board.label, checked: false }
                })
                setScheData(temp)
                setSchedule(res.data.schedule)
                setRenderData(temp)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    const updateSchedule = () => {
        console.log(selectedSubject)
        const listChecked = findCheck()
        let temp = schedule.map((sch, i) => {
            if (listChecked.includes(i)) {
                return {
                    ...sch, mac: mac, board: { label: room, value: mac }
                }
            } else {
                return sch
            }
        })
        API.post('updateSchedule/', { subjectID: selectedSubject, newschedule: temp })
            .then((res) => {
                showMessage({
                    message: `Edit Complete`,
                    type: "success",
                });
                setTrickker(true)
            })
            .catch((err) => console.log(err))
    }
    const findCheck = () => {
        let list = []
        renderData.forEach((data, i) => {
            if (data.checked === true) {
                list = [...list, i]
            }
        })
        return list

    }
    const convertDateStr = (date) => {
        const dateObj = new Date(date)
        const day = dateObj.getDate()
        const month = dateObj.getMonth() + 1
        const year = dateObj.getFullYear()
        return `${day}/${month}/${year}`

    }
    return (
        <View>
            <View style={styles.itemSubject}>
                <View style={styles.subjectDetailContainer}>
                    <View style={styles.subjectTitle}>
                        <Text style={styles.textTitle}>{room}</Text>
                    </View>
                    <View style={{
                        backgroundColor: 'red',
                        borderBottomColor: Colors.brigthCOlor,
                        borderBottomWidth: 2,
                    }} />
                    <View style={styles.subjectDetail}>
                        <Text>MAC: {mac}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', height: 500 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.selectContainer}>
                        <Text>Select Subject: </Text>
                        <Select
                            style={pickerSelectStyles}
                            onValueChange={(value) => setSelectedSubject(value)}
                            value={selectedSubject}
                            items={subjectList}
                        />
                    </View>
                </View>
                <View style={styles.scrollContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <View style={styles.checkContainer}>
                            <CheckBox
                                onClick={() => {
                                    const temp = [...renderData]
                                    setScheData(temp.map((t) => {
                                        return { ...t, checked: !checkAll }
                                    }))
                                    setCheckAll(!checkAll)
                                }}
                                isChecked={checkAll}

                            />
                            <Text style={styles.textCheck}>{'Check All'}</Text>
                        </View>
                        {renderData.map((sch, i) => {
                            return (
                                <View key={i} style={styles.checkContainer}>
                                    <CheckBox
                                        onClick={() => {
                                            const temp = [...renderData]
                                            temp[i].checked = !temp[i].checked
                                            setScheData(temp)
                                        }}
                                        isChecked={sch.checked}

                                    />
                                    <Text style={styles.textCheck}>{`${sch.date} ${sch.room}`}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>

                <View style={{ width: 70, height: 35, marginVertical: 10 }}>
                    <Button disable={selectedSubject === null} click={updateSchedule} style={{
                        height: '100%'
                    }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Set</Text>
                    </Button>
                </View>

            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    itemSubject: {
        height: 120,
        borderRadius: 15,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.highLigthColor,
        justifyContent: "center",
        alignItems: "center"
    },
    subjectDetailContainer: {
        flexDirection: 'column',
        flex: 3,
        justifyContent: 'center',
        paddingRight: 10
    },
    subjectTitle: {
        flex: 2,
        marginBottom: 5,
    },
    subjectDetail: {
        flex: 1,
        marginVertical: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 50,
        color: Colors.highLigthColor
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkContainer: {
        width: '100%',
        paddingLeft: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textCheck: {
        fontSize: 16,
        paddingLeft: 5,
    },
    scrollContainer: {
        maxHeight: 300,
        width: 250,
    }
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        width: 200,
        height: 40
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 0.5,
        borderColor: '#d9d9d9',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },

});
export default settingScreen