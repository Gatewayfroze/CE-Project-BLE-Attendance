import React from 'react'
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import StartSessionScreen from '../screens/startSessionScreen'
import LeaveScreen from '../screens/leaveScreen'
import StatScreen from '../screens/statScreen'
import ProfileScreen from '../screens/profileScreen'
import DetailLeaveScreen from '../screens/detailLeaveScreen'
import LoginScreen from '../screens/loginScreen'

import StatDetail from '../screens/detailStatScreen'
// const HomeNavigator =createStackNavigator({
//     Select
// })
const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
    headerTitleStyle: {
        fontFamily: 'TH-sarabun-bold',
        fontSize: 30
    },
    headerTintColor: '#FFFFFF',
};

//================= stack screen ========================
const checkInNavigator = createStackNavigator({
    checkIn: StartSessionScreen,
    statDetail:StatDetail
}, { defaultNavigationOptions: defaultStackNavOptions }
)

const leaveNavigator = createStackNavigator({
    checkIn: LeaveScreen,
    detailLeave: DetailLeaveScreen
}, { defaultNavigationOptions: defaultStackNavOptions }
)

const statNavigator = createStackNavigator({
    checkIn: StatScreen,
    statDetail:StatDetail
}, { defaultNavigationOptions: defaultStackNavOptions }
)

const profileNavigator = createStackNavigator({
    checkIn: ProfileScreen
}, { defaultNavigationOptions: defaultStackNavOptions }
)
// =======================tab navigator ===================
const tabScreenConfig = {
    Homes: {
        screen: checkInNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (<MaterialIcons name="location-on"
                    size={22} color={tabInfo.tintColor}
                />
                )
            }
        }
    },
    Leave: {
        screen: leaveNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <MaterialCommunityIcons name="calendar-text"
                        size={22} color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Stat: {
        screen: statNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <MaterialIcons name="insert-chart"
                        size={22} color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Profile: {
        screen: profileNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <MaterialIcons name="person"
                        size={22} color={tabInfo.tintColor}
                    />
                );
            }
        }
    }
}
const tabNavigation = createBottomTabNavigator(
    tabScreenConfig, {
        tabBarOptions: {
            style: {
                paddingTop: 7,
            },
            labelStyle: {
                fontFamily: 'TH-sarabun',
                fontSize: 18
            },
            activeTintColor: '#303030'
        }
    })
const appNavigator = createSwitchNavigator({
    login: LoginScreen,
    inApp: tabNavigation
})
export default createAppContainer(appNavigator)