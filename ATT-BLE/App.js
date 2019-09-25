import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import MainNavigator from './navigation/ATTNavigation'


const fetchFonts = () => {
  return Font.loadAsync({
    'TH-sarabun': require('./assets/fonts/THSarabunNew.ttf'),
    'TH-sarabun-bold': require('./assets/fonts/THSarabunNew-Bold.ttf')
  })
}
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    )
  }
  return <MainNavigator />;
}

const styles = StyleSheet.create({
  container: {
    fontFamily:'TH-sarabun',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontFamily:'TH-sarabun'
  },
});
