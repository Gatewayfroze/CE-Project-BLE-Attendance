import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';// import the different screens
import { createAppContainer } from 'react-navigation';
import {config} from './firebase';
import Login from './Login'
import Main from './Main'// create our app's navigation stack
import test from './test'
const RootStack = createStackNavigator(
    {
      
      Login: { screen: Login },
      Main: { screen: Main },
      test:{screen:test}
  },
    {
      initialRouteName: 'Login',
      headerMode: 'none'
    }    
  );

const App = createAppContainer(RootStack);
export default App