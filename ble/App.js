import React, {Component, useState, useEffect} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {config} from './firebase';
import * as firebase from 'firebase';
import DeviceInfo from 'react-native-device-info'


firebase.initializeApp(config);
db = firebase.firestore();

export default function App() {
  manager = new BleManager();

  const [mail, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [mac,setmac]=useState('none')
  const [Imei,setImei]=useState('')

  // useEffect(() => {
  //   scanMC()
  // });

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

  signUpUser = em => {
    var pass = em +'TEST';
    console.log(pass);
    try {
      firebase.auth().createUserWithEmailAndPassword(em, pass);
    } catch (error) {
      console.log(error, toString());
    }
  };

  calculateDistance =rssi => {
  
    var txPower = -59 //hard coded power value. Usually ranges between -59 to -65
    
    if (rssi == 0) {
      return -1.0; 
    }
  
    var ratio = rssi*1.0/txPower;
    if (ratio < 1.0) {
      return Math.pow(ratio,10);
    }
    else {
      var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;    
      return distance;
    }
  } 
  scanMC =() => {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        this.error(error.message);
        return;
      }
      if (device.name === 'espino') {
        
        this.manager.stopDeviceScan()
        console.log(device.rssi)
        setmac(device.id)        
        
        // let distance = Math.pow(10,(-59-device.rssi)/(10))
        // console.log(calculateDistance(device.rssi))
        //setmac(distance)
      }
  })
}

check = ()=>{
   
  //console.log(scanMC())
  db.collection("transaction").add({
    mac:mac,
    time:firebase.firestore.Timestamp.fromDate(new Date())
})
}
getIMEI = ()=> {
  let uniqueId = DeviceInfo.getUniqueId();
  setImei(uniqueId)

}

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
      {/* <Text>Email</Text> */}
      {/* <TextInput
        style={styles.input}
        onChangeText={em => setemail(em)}></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={pass => setpassword(pass)}></TextInput> */}

      <View style={styles.butt}>
        <Button title="IMEI" onPress={() => this.scanMC()}>
          {' '}
        </Button>
        {/* <Button title="Sign Up" onPress={() => this.sign UpUser(mail)}>
          {' '}
        </Button> */}
      </View>

          <View>
            <Text>{Imei}</Text>
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
