import React from 'react'
import { View,Text,StyleSheet } from 'react-native'

const CheckInScreen = props => {
    return (
        <View style={styles.container} navigation={props.navigation}>
            <Text>สวัสดี</Text>
        </View>
    )
}
CheckInScreen.navigationOptions = navData => {
    return{
        headerTitle:'BLE-Attendence'
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
export default CheckInScreen
