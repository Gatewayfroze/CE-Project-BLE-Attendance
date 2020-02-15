import React,{useState} from 'react'
import { View, StyleSheet, Text, TextInput,AsyncStorage } from 'react-native'
import Button from '../components/button'
import Colors from '../constants/Colors'
import * as firebase from 'firebase';
import {config} from '../firebase';
firebase.initializeApp(config);

const LoginScreen = props => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const storeToken =async (user)=> {
        try {
           await AsyncStorage.setItem("userData", JSON.stringify(user));
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }

      handleLogin = () => {
        
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((data) =>{
            storeToken(data)
            props.navigation.navigate({
                routeName: 'inApp'
            })
            })
          .catch(error => this.setState({ errorMessage: error.message }))
      }

    return (
        <View style={styles.screen}>
            <Text style={{fontSize:40,fontWeight:'bold',color:Colors.primaryColor}}>
                ATTENDA
            </Text>
            <TextInput style={{ height: '3%',backgroundColor:'#f7f7f7', width: '35%', marginVertical: 15, borderBottomColor:Colors.primaryColor ,borderBottomWidth:2}} 
            placeholder="Email"
            placeholderTextColor="grey"onChangeText={email => setemail( email )}/>
            <TextInput style={{ height: '3%',backgroundColor:'#f7f7f7', width: '35%', marginVertical: 15, borderBottomColor:Colors.primaryColor ,borderBottomWidth:2 }} 
            placeholder="Password"
            placeholderTextColor="grey"  onChangeText={password => setpassword( password )}/>
            <Button style={{ height: '5%', width: '20%' }}
                click={() =>{
                    handleLogin()
                     }}>
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