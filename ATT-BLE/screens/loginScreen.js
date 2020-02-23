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

firebase.initializeApp(config);

const LoginScreen = props => {
    const [email, setEmail] = useState("59010734@kmitl.ac.th")
    const [password, setPassword] = useState("99ddae97bc")
    const [disable, setDisable] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
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
                storeToken(data)
                props.navigation.navigate({
                    routeName: 'inApp'
                })
            })
            .catch(error => setErrorMsg(error.message))
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.logo}>
                ATTENDA
            </Text>
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
                loading?<ActivityIndicator style={{marginTop: 30}} size="large" color='white'/>:
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