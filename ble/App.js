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
import { db } from "./firebase";

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
    this.manager.startDeviceScan(null, null, (error, device) => {
      this.info('Scanning...');

      if (error) {
        this.error(error.message);
        return;
      }

      if (device.name === 'espino') {
        this.info('Connecting to TI Sensor');
        this.manager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            this.info('Discovering services and characteristics');
            return device.discoverAllServicesAndCharacteristics();
          })
          // .then(device => {
          //   this.info('Setting notifications');
          //   return this.setupNotifications(device);
          // })
          .then(
            () => {
              this.info('Listening...' + device.name);
            },
            error => {
              this.error(error.message);
            },
          );
      }
    });
  }
  componentWillMount() {
    db.collection('users')
      .doc('aSrBUTvzlJMktOnQ5BqA')
      .set({
        name: 'panot',
        surname: 'sodsri',
      })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
  }

  componentDidMount() {
    // this.scanAndConnect()
    // this.manager.startDeviceScan(null, null, (error, device) => {
    //   this.info(device.name);
    // })
  }

  render() {
    return (
      <View>
        
      </View>
    );
  }
}
