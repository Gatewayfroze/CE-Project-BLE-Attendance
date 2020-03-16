import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../constants/Colors'
import { PieChart } from "react-native-chart-kit"
import API from '../assets/API'
import Select from 'react-native-picker-select';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler'

const DetailStatScreen = ({ navigation }, ...props) => {
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5
    }
    const subjectID = navigation.state.params.subjectID
    const currentUID = navigation.state.params.uid
    const subjectName = navigation.state.params.subjectName
    const schedule = navigation.state.params.schedule
    const students = navigation.state.params.students.sort()
    const studentNo = students.length
    const [dataChart, setDataChart] = useState([])
    const [transaction, setTransac] = useState('')
    const [studentsData, setStudetnsData] = useState()
    const [selected, setSelected] = useState(null)
    const [tableData, setTableData] = useState([])
    // find current subject
    const findCurrentSchedule = () => {
        const now = new Date
        for (let i = 0; i < schedule.length; i++) {
            let sch = schedule[i]
            const date = new Date(sch.date)
            if (date > now) {
                return i
            } else if (i === schedule.length - 1 && now >= date) {
                return schedule.length
            }
        }
        return 0
    }
    const convertDateStr = (date) => {
        const dateObj = new Date(date)
        const day = dateObj.getDate()
        const month = dateObj.getMonth() + 1
        const year = dateObj.getFullYear()
        return `${day}/${month}/${year}`

    }
    const currentSch = findCurrentSchedule()
    let scheduleList = schedule.slice(0, currentSch).map((data) => ({ label: convertDateStr(data.date), value: data.schIndex }))
    scheduleList.sort((a, b) => {
        return a.value - b.value //sort by date ascending
    })
    useEffect(() => {
        fetchTrasaction()

    }, [])
    useEffect(() => {
        fetchListStudent()
    }, [transaction])
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
            summary.ok = parseInt((summary.ok / all * 100))
            summary.late = parseInt((summary.late / all * 100))
            summary.absent = 100 - summary.ok - summary.late
            setDataChart([{
                name: "% In time",
                population: summary.ok,
                color: Colors.primaryColor,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "% Late",
                population: summary.late,
                color: Colors.secondaryColor,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "% Absent",
                population: summary.absent,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }])
        }

    }, [studentsData])
    useEffect(() => {
        console.log(selected)
        if (selected !== null) {
            const schData = studentsData.map((std) => {
                const found = transaction.find((trans) => {
                    return trans.schIndex == selected && trans.studentUID == std.uid
                })
                let defaultTxt = 'absent'
                // return { ...std, status: found ? found.status : defaultTxt }
                return [std.studentID, std.name, found ? found.status : defaultTxt]
            })
            setTableData(schData)
        }
    }, [selected])
    const fetchTrasaction = () => {
        API.post('getTransactionSub/', { subjectID })
            .then((res) => {
                setTransac(res.data)
            })
            .catch((err) => console.log(err))
    }
    const fetchListStudent = async () => {
        // setLoading(true)
        const val = students.map(async (student) => {
            const detail = await API.post('getStudent/', { studentID: student })
            const name = detail.data.name + ' ' + detail.data.surname
            const studentID = detail.data.email.replace('@kmitl.ac.th', '')
            // setLoading(false)
            return { name, studentID, uid: detail.data.uid }
        })
        const results = await Promise.all(val)
        setStudetnsData(results)
    }
    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.statContainer}>
                    <PieChart
                        data={dataChart}
                        width={300}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                </View>
                <View style={styles.selectContainer}>
                    <Text>Select Schedule: </Text>
                    <Select
                        style={pickerSelectStyles}
                        onValueChange={(value) => setSelected(value)}
                        value={selected}
                        items={scheduleList}
                    />

                </View>
                <View style={styles.tableContainer}>

                    <Table borderStyle={{ borderWidth: 1.5, borderColor: '#bababa' }}>
                        <Row data={['ID', 'name', 'status']} style={styles.head} textStyle={styles.textHeader} />
                        <Rows data={tableData} textStyle={styles.text} />
                    </Table>
                </View>
            </View>
        </ScrollView>

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
    tableContainer: {
        paddingHorizontal: 35,
        width: '100%'
    },
    textHeader: { textAlign: 'center' },
    head: { height: 40, backgroundColor: '#ffca80' },
    text: { margin: 6, marginLeft: 15 },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45%',
        width: '80%',
        paddingVertical: 50,
        paddingLeft: '2%',
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
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
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
export default DetailStatScreen