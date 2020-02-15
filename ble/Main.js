import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Platform, Image, Text, View,Button,AsyncStorage} from 'react-native';
import * as firebase from 'firebase';
import {config} from './firebase';
// import {getToken,storeToken} from './ManageToken'

const Main=props=> {
  const [currentUser, setcurrentUser] = useState(null);

   getToken= async ()=> {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      setcurrentUser(data)
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  useEffect(() => {
   getToken()
  },[]);

  return (
    <View style={styles.container}>
  <Text>Hi </Text>
      <Button title="press" onPress={()=>console.log(currentUser.user.email)} />
    </View>
  );
}

export default Main


// export default class Main extends React.Component {
    

//   state = { currentUser: null }

//   componentDidMount() {
//     const  currentUser  = firebase.auth()
//     this.setState( currentUser )
//     //console.log(currentUser.email)
// }

//   render() {
//     const { currentUser } = this.state
//     return (
//       <View style={styles.container}>
//         <Text>
//           Hi {currentUser && currentUser.email}!
//         </Text>
//         <Button title="press" onPress={()=>this.props.navigation.navigate('test')} />
//       </View>
//     )
//   }
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
