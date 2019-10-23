import React, {Component, useState} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {config} from './firebase';
import * as firebase from 'firebase';

firebase.initializeApp(config);
db = firebase.firestore();

export default function App() {
  manager = new BleManager();

  const [mail, setemail] = useState('');
  const [password, setpassword] = useState('');

  loginUser = (em, pass) => {
    console.log('logged');
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(em, pass)
        .then(user => {
          profile = firebase.auth().currentUser;
          alert('Welcome ' + profile.email);
        });
    } catch (error) {
      console.log(error.toString());
      alert(error.toString());
    }
  };

  signUpUser = (em, pass) => {
    // pass = Math.random().toString(36).slice(2)
    try {
      firebase.auth().createUserWithEmailAndPassword(em, pass);
    } catch (error) {
      console.log(error, toString());
    }
  };

  scanAndConnect = () => {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        this.error(error.message);
        return;
      }

      if (device.name === 'espino') {
        manager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            console.log(device.id);
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            return device.services();
          })
          .then(ss => {
            console.log(device.serviceUUIDs);
            console.log(ss[2]);

            return ss[2].characteristics();
          })
          .then(cc => {
            console.log(cc);
          })
          .catch(error => {
            console.log(error.message);

            throw error;
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={em => setemail(em)}></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={pass => setpassword(pass)}></TextInput>

      <View style={styles.butt}>
        <Button title="Log in" onPress={() => this.loginUser(mail, password)}>
          {' '}
        </Button>
        <Button title="Sign Up" onPress={() => this.signUpUser(mail, password)}>
          {' '}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: '70%',
  },

  butt: {
    flexDirection: 'row',
  },
});
