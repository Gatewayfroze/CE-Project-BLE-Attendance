import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text, RefreshControl } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Colors from '../constants/Colors'
import { } from 'react-native-gesture-handler';
import { PieChart } from "react-native-chart-kit"
import API from '../assets/API'



const DetailStatScreen = ({ navigation }, ...props) => {
    const [subjectData, setSubjectData] = useState('')
    const [currentSchedule, setCurrentSch] = useState(-1)
    const [transaction, setTransaction] = useState([])
    const [dataSchedule, setDataSchedule] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataChart, setDataChart] = useState([])
    const subjectID = navigation.state.params.subjectID
    const currentUID = navigation.state.params.uid

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5
    }
    useEffect(() => {
        fetchSubject()
    }, [])
    useEffect(() => {
        if (subjectData !== '') {
            const schedule = subjectData.schedule
            let current = -1
            const now = new Date
            const schCol = schedule.map((sch, i) => {
                const currentDate = new Date(sch.date)
                if (now > currentDate) {
                    setCurrentSch(i)
                    current = i
                }
                const day = currentDate.getDate()
                const month = currentDate.getMonth() + 1
                const year = currentDate.getFullYear()
                let dateString = `${day}/${month}/${year}`
                return dateString
            })
            let data = schCol.map((sch, i) => {
                let dateSch = new Date(...sch.split('/').reverse())
                dateSch.setMonth(dateSch.getMonth() - 1)
                let defaultTxt = ''
                // console.log(dateSch.toString())
                // console.log(now.toString())
                // console.log(dateSch < now)
                // console.log('----------------------')
                if (i <= current) defaultTxt = 'Absent' 
                return [i + 1, sch, defaultTxt]
            })
            setDataSchedule(data)
            fetchTrasaction(data, current)
        }
    }, [subjectData])

    useEffect(() => {

    }, [transaction])
    const fetchTrasaction = (dataSch, currentSch) => {
        setLoading(true)
        API.post('getTransactionSubStu/', { uid: currentUID, subjectID })
            .then((res) => {
                setLoading(false)
                setTransaction(res.data)
                let tempSch = dataSch
                tempSch.forEach((sch, i) => {
                    const findTrans = res.data.find((trans) => {
                        return trans.schIndex == i
                    })
                    if (findTrans) sch[sch.length - 1] = findTrans.status
                })
                let valStatus = { ok: 0, late: 0, absent: currentSch + 1 }
                res.data.forEach((data) => {
                    valStatus[`${data.status}`] += 1
                })
                console.log(res.data)
                setDataChart([{
                    name: "In time",
                    population: valStatus.ok,
                    color: Colors.primaryColor,
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Late",
                    population: valStatus.late,
                    color: Colors.secondaryColor,
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Absent",
                    population: valStatus.absent,
                    color: "#F00",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                }])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const fetchSubject = () => {
        setLoading(true)
        API.post('getSubject/', { subjectID })
            .then((res) => {
                setLoading(false)
                setSubjectData(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <ScrollView style={{ paddingHorizontal: 10 }} refreshControl={<RefreshControl color={Colors.primaryColor} refreshing={loading} onRefresh={fetchSubject} />}>
            <View style={styles.statValContain}>
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
            </View>
            <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 1.5, borderColor: '#bababa' }}>
                    <Row data={['คาบเรียนที่', 'วันที่', 'สถานะ']} style={styles.head} textStyle={styles.textHeader} />
                    <Rows data={dataSchedule} textStyle={styles.text} />
                </Table>
            </View>
        </ScrollView >

    )
}
DetailStatScreen.navigationOptions = ({ navigation }) => {
    const subjectName = navigation.state.params.subjectName
    // const subjectName = navData.state.params.subjectName
    return {
        headerTitle: subjectName
    }
}
const styles = StyleSheet.create({
    statValContain: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%',
        marginVertical: 10
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
        width: '99%',
        paddingVertical: 50,
        borderRadius: 20,
        // shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
    },
    tableContainer: {
        paddingHorizontal: 35
    },
    titleContainer: {
        flex: 2,
        justifyContent: "space-between",
        // backgroundColor: 'red',
        width: '100%',
        height: '100%',
        paddingLeft: 30,

    },
    detailContainer: {
        flex: 1,
        justifyContent: "space-between",
        // backgroundColor: 'green',
        width: '100%',
        height: '100%'
    },
    head: { height: 40, backgroundColor: '#deffed' },
    text: { margin: 6, marginLeft: 15 },
    titleText: {
        color: Colors.highLigthColor,
        fontSize: 22
    },
    detailText: {
        fontSize: 22
    },
    buttonSize: {
        height: 35,
        width: '30%'
    },
    textHeader: { textAlign: 'center' }
})
export default DetailStatScreen