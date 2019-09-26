import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import SubjectCheckIn from '../components/subjectCheckIn'
const CheckInScreen = props => {
  return (
    <View style={styles.screen} navigation={props.navigation}>
      <View style={{marginHorizontal:20, justifyContent:"center" ,alignItems:"center"}}>
        <Text style={{fontFamily:'TH-sarabun' , fontSize:25}}>กดปุ่ม CheckIn เพื่อทำการเช็คชื่อในรายวิชาที่เลือก</Text>
      </View>
      <ScrollView>
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
        <SubjectCheckIn title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
      </ScrollView>
    </View>
  )
}
CheckInScreen.navigationOptions = navData => {
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
export default CheckInScreen
