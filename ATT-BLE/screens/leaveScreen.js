import React from 'react'
import { View, Button, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import SubjectLeave from '../components/subjectLeave'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
const LeaveScreen = props => {
    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.buttonLeave} onPress={() => {
                props.navigation.navigate({
                    routeName: 'inputLeave'
                })
            }}>
                <Entypo name="new-message" size={22} color='white' />
                <Text style={{ color: 'white' }}>New Leave</Text>
            </TouchableOpacity>
            <ScrollView>
                <SubjectLeave title='ป่วยครับ' subject='Data Mining' detail='ไม่สบายน้ำมูกไหล' onClick={() => {
                props.navigation.navigate({
                    routeName: 'detailLeave'
                })
            }}/>
            </ScrollView>
        </View>
    )
}
LeaveScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Select Subject to Leave'
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10
    },
    text: {
        fontFamily: 'TH-sarabun'
    },
    buttonLeave: {
        flexDirection: 'row',
        backgroundColor: Colors.highLigthColor,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 20,


    }
});
export default LeaveScreen