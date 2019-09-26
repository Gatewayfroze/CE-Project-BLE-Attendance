import React from 'react'
import { View, StyleSheet,Button,Text} from 'react-native'

const LoginScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>
                Sawadee
            </Text>
            <Button title='Login' onPress={()=> props.navigation.navigate({
                routeName:'inApp'
            })}/>
        </View>
    )
}
const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'
    }
})
export default LoginScreen