import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
import * as firebase from 'firebase';
import {config} from './firebase';

// function Main() {
//   const [currentUser, setcurrentUser] = useState('');

 

//   useEffect(() => {
//     const User= firebase.auth();
//     console.log(User)
//     setcurrentUser(User);
//     // console.log(User)
//   });

//   return (
//     <View style={styles.container}>
//       <Text>Hi {currentUser.email}!</Text>
//     </View>
//   );
// }

// export default Main;
export default class Main extends React.Component {
    
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    console.log(currentUser.email)
}

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
