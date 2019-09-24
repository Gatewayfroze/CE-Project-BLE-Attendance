import React from 'react'
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { View, Text } from 'react-native'

import Colors from '../constants/Colors';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import CheckInScreen from '../screens/checkInScreen'
import LeaveScreen from '../screens/leaveScreen'
import StatScreen from '../screens/statScreen'
import ProfileScreen from '../screens/profileScreen'

const tabNavigation = createBottomTabNavigator({
    Homes: {
        screen: CheckInScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <MaterialIcons
                        name="location-on"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Leave: {
        screen: LeaveScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <MaterialCommunityIcons
                        name="calendar-text"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Stat: {
        screen: StatScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <MaterialIcons
                        name="insert-chart"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <MaterialIcons
                        name="person"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },

}
    ,{
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'TH-sarabun'
          },
          activeTintColor: Colors.accentColor
        }
      }
    )
export default createAppContainer(tabNavigation)