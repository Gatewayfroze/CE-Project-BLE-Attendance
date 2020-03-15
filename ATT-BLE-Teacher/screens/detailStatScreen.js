import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../constants/Colors'
import { PieChart } from "react-native-chart-kit"
import API from '../assets/API'
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
}
const DetailStatScreen = ({ navigation }, ...props) => {
    const subjectID = navigation.state.params.subjectID
    const currentUID = navigation.state.params.uid
    const subjectName = navigation.state.params.subjectName
    const schedule = navigation.state.params.schedule
    const studentNo = navigation.state.params.studentNo
    const [transaction, setTransac] = useState('')
    // find current subject
    const findCurrentSchedule = () => {
        for (let i = 0; i < schedule.length; i++) {
            let sch = schedule[i]
            const now = new Date
            const date = new Date(sch.date)
            if (date > now) {
                return i
            }
        }
        return 0
    }
    const currentSch = findCurrentSchedule()
    useEffect(() => {
        fetchTrasaction()
    }, [])
    useEffect(() => {
        if (transaction !== '') {
            let tempChart = schedule.map((sch) => {
                let defaultObj = {
                    ok: 0,
                    late: 0,
                    absent: studentNo
                }
                const foundTransacs = transaction.filter((trans, i) => {
                    return sch.schIndex == trans.schIndex
                })

                foundTransacs.forEach((foundTransac) => {
                    if (foundTransac) {
                        defaultObj[`${foundTransac.status}`] += 1
                        defaultObj.absent -= 1
                    }
                })

                return defaultObj
            })

            tempChart = tempChart.slice(0, currentSch)
            let summary =
                { ok: 0, late: 0, absent: 0 }

            tempChart.forEach((data) => {
                summary.ok += data.ok
                summary.late += data.late
                summary.absent += data.absent
            })
            let all = studentNo * currentSch
            if (all == 0) all = 1
            // ======================================= prevent case 0/0 == Nan
            summary.ok = summary.ok / all * 100
            summary.late = summary.late / all * 100
            summary.absent = summary.absent / all * 100
            console.log(summary)
        }

    }, [transaction])

    const fetchTrasaction = () => {
        API.post('getTransactionSub/', { subjectID })
            .then((res) => {
                setTransac(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <View style={styles.screen}>
            <View style={styles.statContainer}>

            </View>
        </View>
    )
}
DetailStatScreen.navigationOptions = navData => {
    return {
        headerTitle: 'รายละเอียดการเข้าเรียน'
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45%',
        width: '80%',
        paddingVertical: 50,
        paddingLeft: '10%',
        borderRadius: 20,
        marginVertical: 20,
        // shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,

    },
    titleContainer: {
        flex: 2,
        justifyContent: "space-between",
        // backgroundColor: 'red',
        width: '100%',
        height: '100%',

    },
    detailContainer: {
        flex: 1,
        justifyContent: "space-between",
        // backgroundColor: 'green',
        width: '100%',
        height: '100%'
    },
    text: {
    },
    titleText: {
        color: Colors.highLigthColor,
        fontSize: 28
    },
    detailText: {
        fontSize: 28
    },
    buttonSize: {
        height: 35,
        width: '30%'
    }
})
export default DetailStatScreen