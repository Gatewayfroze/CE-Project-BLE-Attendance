import React from 'react'
import { View, Text } from 'react-native'

const StatScreen = props => {
    return (
        <View>
            <Text>
                ครับ
            </Text>
        </View>
    )
}
StatScreen.navigationOptions = navData => {
    return{
        headerTitle:'Select Subject to View Stat'
    }
}
export default StatScreen