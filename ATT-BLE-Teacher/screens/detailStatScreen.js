import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../constants/Colors'
import { PieChart } from "react-native-chart-kit"
import API from '../assets/API'

const DetailStatScreen = ({ navigation }, ...props) => {
    const subjectID = navigation.state.params.subjectID
    const currentUID = navigation.state.params.uid
    const subjectName = navigation.state.params.subjectName
    const schedule = navigation.state.params.schedule

    useEffect(() => {
        console.log(schedule)
    })
    return (
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