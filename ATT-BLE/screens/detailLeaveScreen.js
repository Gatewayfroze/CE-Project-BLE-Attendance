import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import Colors from '../constants/Colors'

const DetailLeaveScreen = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.leaveDetailContainder}>
                <Text style={styles.title}>ป่วยครับ :Data Mining 10/09/62</Text>
                <Text style={styles.detail}>ไม่สบายเป็นไข้หวัดใหญ่ น้ำมูกไหล ตัวร้อน</Text>
            </View>
        </View>
    )
}
DetailLeaveScreen.navigationOptions = navData => {
    return {
        headerTitle: 'รายละเอียดการลา'
    }
}
const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
    },
    leaveDetailContainder: {
        borderRadius: 15,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingVertical:20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:30,
    },
    title:{
        fontSize:22,
        color:Colors.highLigthColor
    },
    detail:{
        fontSize:15,
    }
})
export default DetailLeaveScreen