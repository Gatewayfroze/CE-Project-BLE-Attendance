import React, {Component, useState, useEffect} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
// import {config} from './firebase';
// import * as firebase from 'firebase';
import DeviceInfo from 'react-native-device-info'




export default function App() {
  manager = new BleManager();

  
  const [mac,setmac]=useState('none')
  

  // useEffect(() => {
  //   scanMC()
  // });

  

  

  
  
  scanMC = async (service,espname) => {
    
    var num = new Array()
     this.manager.startDeviceScan([service], null, (error, device) => {
      if (error) {
        console.log(error.message);
         return;
       }  
       
      if(device.name == espname){
        clearTimeout(time)
        num.push(Math.pow(10,(-62-device.rssi)/(20)))
        if(num.length == 50){
          clearTimeout(time)
          this.manager.stopDeviceScan()
          const result = num.reduce((sum,number) => {
          return sum+number/num.length
        }, 0)     
      console.log(device.name+' : '+device.serviceUUIDs +' : '+result)
        }       
        
      //setmac(device.name)
      
      }
      
       
        

        
  })
  time = setTimeout(()=> {
    this.manager.stopDeviceScan()
    console.log('not found')
  }, 20000);

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
        <Button title="IMEI" onPress={() => this.scanMC("5fafc201-1fb5-459e-8fcc-c5c9c331914b","espino2")}>
          {' '}
        </Button>
        {/* <Button title="Sign Up" onPress={() => this.sign UpUser(mail)}>
          {' '}
        </Button> */}
      </View>

          <View>
            <Text>{mac}</Text>
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
