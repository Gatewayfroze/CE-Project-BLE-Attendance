import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const LeaveScreen =props=>{
    return  (
        <View>
            <Text>หีๆๆๆ </Text>
        </View>
    )
}
LeaveScreen.navigationOptions = navData => {
    return{
        headerTitle:'Select Subject to Leave'
    }
}
const styles = StyleSheet.create({
    container: {
      fontFamily:'TH-sarabun',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      fontFamily:'TH-sarabun'
    },
  });
export default LeaveScreen