import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native'
import Button from '../components/button'
import API from '../constants/API'
import { showMessage } from "react-native-flash-message";

const RegisterPage = (props) => {
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [data, setData] = useState({
        studentID: '',
        name: '',
        year: '',
        faculty: ''
    })
    useEffect(() => {
        if (data.studentID.length !== 8 ||
            data.name === '' ||
            data.year === '' ||
            data.faculty === ''
        ) {
            setDisable(true)
        } else {
            setDisable(false)
        }

    }, [data])

    const createAccount = (dataUser) => {
        const user = {}
        user.email = dataUser.studentID + '@kmitl.ac.th'
        user.name = dataUser.name.split(' ')[0]
        user.surname = data.name.split(' ')[1]
        user.faculty = dataUser.faculty
        user.year = dataUser.year
        user.role = 'student'
        console.log(user)
        setLoading(true)

        API.post('createAccount/', user)
            .then(function (response) {
                setLoading(false)
                props.close(false)
                showMessage({
                    message: `Register Complete`,
                    type: "success",
                });
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error)
            })
    }
    return (
        <React.Fragment>
            <Text style={styles.logo}>
                {'Register'}
            </Text>

            <View style={styles.inputView}>
                <TextInput style={styles.textInput}
                    placeholder="Student ID"
                    keyboardType="numeric"
                    value={data.studentID}
                    onChangeText={studentID => setData({ ...data, studentID })}
                    maxLength={8}
                    placeholderTextColor="grey" />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput}
                    placeholder="Name - Surname"
                    value={data.name}
                    onChangeText={name => setData({ ...data, name })}
                    placeholderTextColor="grey" />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput}
                    placeholder="Faculty"
                    value={data.faculty}
                    onChangeText={faculty => setData({ ...data, faculty })}
                    placeholderTextColor="grey" />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput}
                    placeholder="year"
                    value={data.year}
                    onChangeText={year => setData({ ...data, year })}
                    keyboardType="numeric"
                    maxLength={1}
                    placeholderTextColor="grey" />
            </View>
            <View style={styles.errorMsgContainer}>
                <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>

            {
                loading ? <ActivityIndicator style={{ marginTop: 30 }} size="large" color='white' />
                    :
                    <Button style={styles.button} disable={disable}
                        click={() => createAccount(data)}>
                        <Text style={{ color: 'white' }}>Register</Text>
                    </Button>
            }
            <Button style={{
                ...styles.button,
                backgroundColor: 'rgb(69, 172, 156)',
                borderWidth: 1,
                borderColor: '#fff'
            }}
                click={() => props.close(false)}>
                <Text style={{ color: 'white' }}>Back</Text>
            </Button>

        </React.Fragment >

    )

}

const styles = StyleSheet.create({
    logo: {
        fontSize: 50,
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    screen: {
        flex: 1,
        paddingTop: '45%',
        alignItems: 'center',
        backgroundColor: 'rgb(69, 172, 156)'
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
        marginVertical: 5
    },
    errorMsgContainer: {
        width: '65%'
    },
    errorMsg: {
        color: 'red'
    }
})
export default RegisterPage