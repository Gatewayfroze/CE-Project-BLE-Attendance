import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import SubjectCheckIn from '../components/subjectCheckIn'
import CurrentSubject from '../components/currentSubject'
const StartSessionScreen = props => {
  return (
    <View style={styles.screen} navigation={props.navigation}>
      <View style={{ marginHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: 'TH-sarabun', fontSize: 25 }}>เลือกบอร์ดใกล้เครื่องเพื่อทำการตั้งค่า</Text>
      </View>
      {/* โชว์ status ที่กำลังเรียนอยู่ปัจจุบัน */}
      {/* <CurrentSubject/> */}
      <ScrollView>
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' onClick={() => {
          props.navigation.navigate({
            routeName: 'statDetail'
          })
        }
        } />
        <SubjectCheckIn />
      </ScrollView>
    </View>
  )
}
StartSessionScreen.navigationOptions = navData => {
  return {
    headerTitle: 'BLE-Attendence'
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
