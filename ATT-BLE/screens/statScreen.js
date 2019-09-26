import React from 'react'
import { View, Text,ScrollView,StyleSheet } from 'react-native'
import SubjectStat from '../components/subjectStat'

const StatScreen = props => {
    return (
        <View style={styles.screen}>
            <ScrollView>
                <SubjectStat title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
                <SubjectStat title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
                <SubjectStat title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
                <SubjectStat title='Data structure and algorithm' detail='เวลาเรียน: 07:30-12:00 น.' />
            </ScrollView>
        </View>
    )
}
StatScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Select Subject to View Stat'
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
export default StatScreen