import React from 'react'
import { View, Button, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'

import SubjectLeave from '../components/subjectLeave'
const LeaveScreen = props => {
    return (
        <View style={styles.screen}>

            <ScrollView>

                <SubjectLeave title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' onClick={() => {
                    props.navigation.navigate({
                        routeName: 'inputLeave'
                    })
                }} />
                <SubjectLeave title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
                <SubjectLeave title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
                <SubjectLeave title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
                <SubjectLeave title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
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

});
export default LeaveScreen