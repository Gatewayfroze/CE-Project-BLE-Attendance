import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native'
import * as firebase from 'firebase';
import {config} from './firebase';
import {getToken,storeToken} from './ManageToken'
firebase.initializeApp(config);




export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null } 

  // async storeToken(user) {
  //   try {
  //      await AsyncStorage.setItem("userData", JSON.stringify(user));
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // }
  // async getToken() {
  //   try {
  //     let userData = await AsyncStorage.getItem("userData");
  //     let data = JSON.parse(userData);
  //     console.log(data);
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // }
  
  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) =>{
        storeToken(data)
        
        this.props.navigation.navigate('Main')})
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  

  
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  })

//   export default Login