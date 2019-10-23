import React from 'react'
import {StyleSheet,View,Text} from 'react-native'


const DetailLeaveScreen= props=>{
    return (
        <View>
            <Text>รายละเอียดการลานะจ๊ะ</Text>
        </View>
    )
}
DetailLeaveScreen.navigationOptions = navData => {
    return {
        headerTitle: 'รายละเอียดการลา'
    }
}
const styles=StyleSheet.create({

})
export default DetailLeaveScreen