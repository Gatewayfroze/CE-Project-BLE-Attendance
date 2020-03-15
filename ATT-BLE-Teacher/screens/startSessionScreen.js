import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  RefreshControl
} from 'react-native'
import SubjectCheckIn from '../components/subjectCheckIn'
import CurrentSubject from '../components/currentSubject'
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import API from '../assets/API'
import { TouchableOpacity } from 'react-native-gesture-handler';
const StartSessionScreen = props => {
  const [currentUser, setCurrentUser] = useState('');
  const [boardDetail, setBoardDetail] = useState([])
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(false)
  const [roomInput, setRoomInput] = useState('')
  const [subjectsID, setSubjectsID] = useState([])
  const [subjectDetail, setSubjectsDetail] = useState([])

  useEffect(() => {
    getToken()
  }, []);

  useEffect(() => {
    if (currentUser !== '') {
      fetchUserData(currentUser.email)
      fetchBoard()
    }
  }, [currentUser])
  useEffect(() => {
    if (subjectsID.length !== 0) {
      getSubjectDetail(subjectsID)
    }
  }, [subjectsID])
  useEffect(() => {
    if (roomInput.length == 0) {
      setSearchData(boardDetail)
    } else {
      setSearchData(searchData.filter((data) => {
        return data.searchName.includes(roomInput.toLocaleLowerCase())
      }))
    }
  }, [roomInput])
  getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      setCurrentUser(data.user)
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  const fetchUserData = (email) => {
    API.post('getUser/', { email })
      .then((res) => {
        setSubjectsID(res.data.subject)
      })
  }
  const getSubjectDetail = async (subjectsID) => {
    setSubjectsDetail([])
    console.log('yay')
    const subDetail = subjectsID.map(async (subject) => {
      const res = await API.post('getSubject/', { subjectID: subject })
      const detail = await res.data
      return { ...detail, subjectID: subject }
    })
    const results = await Promise.all(subDetail)
    setSubjectsDetail(results)
  }
  const fetchBoard = () => {
    setLoading(true)
    console.log('gettt')
    API.post('getBoard/').then((res) => {
      const temp = res.data.map((data) => {
        return { ...data, searchName: data.boardName.toLocaleLowerCase() }
      })
      setBoardDetail(temp)
      setSearchData(temp)
      setLoading(false)
    })
  }
  return (
    <View style={styles.screen} navigation={props.navigation}>
      <View style={{ marginHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
        {/* <Text style={{ fontFamily: 'TH-sarabun', fontSize: 25 }}>เลือกอุปกรณ์ประจำห้องเพื่อตั้งค่า</Text> */}
      </View>
      <View style={styles.selectContainer}>
        <Text>Enter Room: </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={roomInput}
            onChangeText={(txt) => { setRoomInput(txt) }}
          />
          {roomInput.length !== 0 &&
            <TouchableOpacity onPress={() => setRoomInput('')}>
              <Entypo name="circle-with-cross"
                size={22} color='gray'
              />
            </TouchableOpacity>}
        </View>
      </View>
      <ScrollView style={{ width: '100%' }} refreshControl={<RefreshControl color={Colors.primaryColor} refreshing={loading} onRefresh={fetchBoard} />}>
        {
          searchData.map((board, i) => {
            return (
              <SubjectCheckIn key={i} title={board.boardName} MAC={board.mac} onClick={() => {
                props.navigation.navigate('settingBLE', {
                  room: board.boardName,
                  mac: board.mac,
                  subjectsDetail: subjectDetail
                })
              }
              } />)
          })}
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
  },
  text: {
    fontFamily: 'TH-sarabun'
  },
  input: {
    fontSize: 16,
    color: 'black',
    width: '98%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 4,
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 200,
    height: 40
  },
  selectContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

});
export default StartSessionScreen
