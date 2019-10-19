/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {View, Text} from 'react-native';
import {db} from './firebase';

export default class App extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {info: '', values: {}};
    this.prefixUUID = 'f000aa';
    this.suffixUUID = '-0451-4000-b000-000000000000';
  }
  serviceUUID(num) {
    return this.prefixUUID + num + '0' + this.suffixUUID;
  }

  notifyUUID(num) {
    return this.prefixUUID + num + '1' + this.suffixUUID;
  }

  writeUUID(num) {
    return this.prefixUUID + num + '2' + this.suffixUUID;
  }
  info(message) {
    this.setState({info: message});
  }

  error(message) {
    this.setState({info: 'ERROR: ' + message});
  }

  updateValue(key, value) {
    this.setState({values: {...this.state.values, [key]: value}});
  }

  scanAndConnect() {
    // console.log('55555555555555555555555555')
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        this.error(error.message);
        return;
      }

      if (device.name === 'espino') {
        this.info('Connecting');
        this.manager.stopDeviceScan();
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
            //console.log(dd)
            console.log(device.serviceUUIDs);
            console.log(ss[2])

            return ss[2].characteristics()
          })
          .then(cc => {
            console.log(cc);
          })
          .catch(error => {
            console.log(error.message);
            // ADD THIS THROW error
            throw error;
          });
      }
    });
  }
  // componentWillMount() {
  // db.collection('users')
  //   .doc('aSrBUTvzlJMktOnQ5BqA')
  //   .set({
  //     name: 'panot',s
  //     surname: 'sodsri',
  //   })
  //   .then(function() {
  //     console.log('Document successfully written!');
  //   })
  //   .catch(function(error) {
  //     console.error('Error writing document: ', error);
  //   });
  // }

  componentDidMount() {
    this.scanAndConnect();
    // this.manager.startDeviceScan(null, null, (error, device) => {
    //   // console.log(device.serviceUUIDs);
    //   if(device != null){
    //     this.manager.stopDeviceScan()
    //     device.connect().then((device)=>{
    //         console.log(device.serviceUUIDs)
    //     })

    //   }else{
    //     console.log('kuy')
    //   }

    // });
  }

  render() {
    return (
      <View>
        <Text>{this.state.info}</Text>
      </View>
    );
  }
}
