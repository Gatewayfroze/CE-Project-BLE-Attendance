import React from 'react'
import { View, Text,ScrollView,StyleSheet } from 'react-native'
import SubjectStat from '../components/subjectStat'

const StatScreen = props => {
    return (
        <View style={styles.screen}>
            <ScrollView>
                <SubjectStat title='Data structure and algorithm' detail='เวลาเรียน: จ. 07:30-12:00 น.' onClick={() => {
                    props.navigation.navigate({
                        routeName: 'statDetail'
                    })
                }} />
                <SubjectStat title='Data Minining' detail='เวลาเรียน: อ. 07:30-12:00 น.' />
                <SubjectStat title='Advance Digital' detail='เวลาเรียน: พฤ. 07:30-12:00 น.' />
                <SubjectStat title='Human computer interaction' detail='เวลาเรียน: พ. 07:30-12:00 น.' />
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
    },

});
export default StatScreen