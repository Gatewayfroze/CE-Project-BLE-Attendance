import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlashMessage from "react-native-flash-message";
import MainNavigator from './navigation/ATTNavigation'

export default function App() {
  return (<React.Fragment>
    <MainNavigator />
    <FlashMessage position="top" animated={true} />
  </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
