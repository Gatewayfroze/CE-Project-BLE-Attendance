import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import SubjectCheckIn from '../components/subjectCheckIn'
import CurrentSubject from '../components/currentSubject'
const CheckInScreen = props => {
  return (
    <View style={styles.screen} navigation={props.navigation}>
      <View style={{ marginHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: 'TH-sarabun', fontSize: 25 }}>กดปุ่ม CheckIn เพื่อเช็คชื่อในรายวิชาที่เลือก</Text>
        <Text style={{ fontFamily: 'TH-sarabun', fontSize: 25 }}></Text>
      </View>
      {/* โชว์ status ที่กำลังเรียนอยู่ปัจจุบัน */}
      {/* <CurrentSubject/> */}
      <ScrollView>
        <SubjectCheckIn status ={1} title='Data structure and algorithm' detail='เวลาเรียน: จ. 07:30-12:00 น.' onClick={() => {
          props.navigation.navigate({
            routeName: 'statDetail'
          })
        }
        } />
        <SubjectCheckIn status ={0} title='Image Processing' detail='เวลาเรียน: จ. 07:30-12:00 น.' />
        <SubjectCheckIn status ={0} title='Data Minining' detail='เวลาเรียน: อ. 07:30-12:00 น.' />
        <SubjectCheckIn status ={0} title='Advance Digital' detail='เวลาเรียน: พฤ. 07:30-12:00 น.' />
        <SubjectCheckIn status ={0} title='Human computer interaction' detail='เวลาเรียน: พ. 07:30-12:00 น.' />
      </ScrollView>
    </View>
  )
}
CheckInScreen.navigationOptions = navData => {
  return {
    headerTitle: 'ATTENDA'
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
export default CheckInScreen
