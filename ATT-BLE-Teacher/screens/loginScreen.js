import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    AsyncStorage,
    ActivityIndicator,
    ColorPropType
} from 'react-native'
import Button from '../components/button'
import Colors from '../constants/Colors'
import * as firebase from 'firebase';
import { config } from '../firebase';
import API from '../assets/API'
import { showMessage } from "react-native-flash-message";

firebase.initializeApp(config)

const LoginScreen = props => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [disable, setDisable] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem("userData").then((value) => {
            if (value == null) {
                console.log(value)
            } else {
                props.navigation.navigate({
                    routeName: 'inApp'
                })
            }
        })
    }, [])

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

        setLoading(true)

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {

                API.post('/getUser', { email: email })
                    .then((res) => {
                        if (res.data.role == 'teacher') {
                            storeToken(data)
                            showMessage({
                                message: `Welcome to Attenda for teacher`,
                                type: "success",
                            });
                            props.navigation.navigate({
                                routeName: 'inApp'
                            })
                        }
                        else {
                            setLoading(false)
                        }
                    })
                    .catch((err) =>
                        console.log(err))

            })
            .catch(error => { setErrorMsg(error.message); setLoading(false) })
    }
    return (
        <View style={styles.screen}>
            <View style={{ alignItems: 'flex-end',marginBottom:30}}>
                <Text style={styles.logo}>{'ATTENDA'}</Text>
                <Text style={{ color: Colors.primaryColor, fontSize: 30 }}>{'TCHR'}</Text>
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.textInput}
                    placeholder="Email"
                    value={email}
                    placeholderTextColor="grey" onChangeText={email => setEmail(email)} />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput}
                    placeholder="Password" placeholderTextColor="grey" secureTextEntry={true}
                    value={password}
                    onChangeText={password => setPassword(password)} />
            </View>
            <View style={styles.errorMsgContainer}>
                <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
            {
                loading ? <ActivityIndicator style={{ marginTop: 30 }} size="large" color='white' /> :
                    <Button style={styles.button} disable={disable}
                        click={() => handleLogin()}>
                        <Text style={{ color: 'white' }}>Login</Text>
                    </Button>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: '45%',
        alignItems: 'center',
        backgroundColor: '#ffb85c'
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        fontWeight: 'bold',
        color: Colors.highLigthColor,
        marginBottom:-10
    },
    textInput: {
        height: 50,
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
        marginTop: 30
    },
    errorMsgContainer: {
        width: '65%'
    },
    errorMsg: {
        color: 'red'
    }
})
export default LoginScreen