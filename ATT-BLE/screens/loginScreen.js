import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import Button from '../components/button'
import Colors from '../constants/Colors'

const LoginScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={{fontSize:40,fontWeight:'bold',color:Colors.primaryColor}}>
                ATTENDA
            </Text>
            <TextInput style={{ height: '3%',backgroundColor:'#f7f7f7', width: '35%', marginVertical: 15, borderBottomColor:Colors.primaryColor ,borderBottomWidth:2}} 
            placeholder="Email"
            placeholderTextColor="grey"/>
            <TextInput style={{ height: '3%',backgroundColor:'#f7f7f7', width: '35%', marginVertical: 15, borderBottomColor:Colors.primaryColor ,borderBottomWidth:2 }} 
            placeholder="Password"
            placeholderTextColor="grey"/>
            <Button style={{ height: '5%', width: '20%' }}
                click={() => props.navigation.navigate({
                    routeName: 'inApp'
                })}>
                <Text style={{ color: 'white' }}>Login</Text>
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default LoginScreen