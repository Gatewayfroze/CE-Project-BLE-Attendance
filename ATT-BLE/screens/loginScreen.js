import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native'
import Button from '../components/button'
import Colors from '../constants/Colors'
import * as firebase from 'firebase';
import { config } from '../firebase';
firebase.initializeApp(config);

const LoginScreen = props => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [disable, setDisable] = useState(true)
    useEffect(() => {
        if (email.length !== 0 && password.length !== 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [email, password])
    const storeToken = async (user) => {
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
            .then((data) => {
                storeToken(data)
                props.navigation.navigate({
                    routeName: 'inApp'
                })
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.logo}>
                ATTENDA
            </Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="grey" onChangeText={email => setEmail(email)} />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput}
                    placeholder="Password" placeholderTextColor="grey" secureTextEntry={true}
                    onChangeText={password => setPassword(password)} />
            </View>
            <Button style={styles.button} disable={disable}
                click={() => handleLogin()}>
                <Text style={{ color: 'white' }}>Login</Text>
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop:'45%',
        alignItems: 'center',
        backgroundColor: 'rgb(69, 172, 156)'
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        marginBottom: 40,
        fontWeight: 'bold',
        color: Colors.highLigthColor
    },
    textInput: {
        height: 50,
        // color: "white"
    },
    inputView: {
        height: 40,
        width: "65%",
        backgroundColor: "#f7fff9",
        borderRadius: 25,
        marginBottom: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
    },
    button: {
        height: 40,
        width: '65%',
        borderRadius: 25,
        marginTop:30
    }
})
export default LoginScreen