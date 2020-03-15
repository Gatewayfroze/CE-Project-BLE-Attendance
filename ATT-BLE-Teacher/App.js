import React, { useState } from 'react';
import FlashMessage from "react-native-flash-message";
import MainNavigator from './navigation/ATTNavigation'

export default function App() {
  return <React.Fragment>
    <MainNavigator />
    <FlashMessage position="top" animated={true} />
  </React.Fragment>

}