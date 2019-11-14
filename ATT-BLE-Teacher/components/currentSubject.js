import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
const CurrentSubject = props => {
    return (
        <View style={styles.currentSubjectContainer}>
            <Text style={styles.title}>วิชา Data Mining</Text>
            <Text style={styles.countStd}>จำนวนนักเรียน 25 คน</Text>
            <Text>หมดเวลา 12:00 </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 30
    },
    countStd: {
        fontSize: 35,
        color:Colors.highLigthColor
    },
    currentSubjectContainer: {
        height: 300,
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