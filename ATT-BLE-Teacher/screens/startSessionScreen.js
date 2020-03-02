import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import SubjectCheckIn from '../components/subjectCheckIn'
import CurrentSubject from '../components/currentSubject'
const StartSessionScreen = props => {
  return (
    <View style={styles.screen} navigation={props.navigation}>
      <View style={{ marginHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
        {/* <Text style={{ fontFamily: 'TH-sarabun', fontSize: 25 }}>เลือกอุปกรณ์ประจำห้องเพื่อตั้งค่า</Text> */}
      </View>
      {/* โชว์ status ที่กำลังเรียนอยู่ปัจจุบัน */}
      {/* <CurrentSubject/> */}
      <ScrollView>
        <SubjectCheckIn title='ECC-811' MAC='00-10-5A-44-12-B5' onClick={() => {
          props.navigation.navigate({
            routeName: 'settingBLE'
          })
        }
        } />
        <SubjectCheckIn title='ECC-810' MAC='00-10-5A-55-12-B4' />
      </ScrollView>
    </View>
  )
}
StartSessionScreen.navigationOptions = navData => {
  return {
    headerTitle: 'ATTENDA for Teacher'
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10
  },
  text: {
    fontFamily: 'TH-sarabun'
  },

});
export default StartSessionScreen
