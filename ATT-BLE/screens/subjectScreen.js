import React, { useState, useEffect } from 'react'
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import Select from 'react-native-picker-select';
import API from '../constants/API'
import { Entypo } from '@expo/vector-icons';
import { showMessage, hideMessage } from "react-native-flash-message";
const SubjectScreen = props => {
    const [currentUser, setCurrentUser] = useState('');
    const [subjectsID, setSubjectsID] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataSelection, setDataSelection] = useState([])
    const [selectedVal, setSelected] = useState(null)
    const [subjectName, setSubjectName] = useState('')
    const [idInput, setIDInput] = useState('')
    useEffect(() => {
        getToken()
    }, []);

    useEffect(() => {
        if (currentUser !== '') {
            getUserSubject()
        }
    }, [currentUser])
    useEffect(() => {
        if (currentUser !== '' && subjectsID !== []) {
            getSubjectDetail()
            console.log('fecth data Detail')
        }
    }, [subjectsID])

    useEffect(() => {
        if (idInput.length === 8) {
            console.log('ready!!')
            setLoading(true)
            API.post('getSubject/', { subjectID: idInput })
                .then(function (response) {
                    setSubjectName(response.data.subjectName)
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            setSubjectName('')
        }
    }, [idInput])
    // -----------------------------------------------------------------------------
    getToken = async () => {
        try {
            let userData = await AsyncStorage.getItem("userData");
            let data = JSON.parse(userData);
            setCurrentUser({ ...data.user, studentID: data.user.email.replace('@kmitl.ac.th', '') })
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    // --------------------------------- API----------------------------------------------------------------
    const enroll = () => {
        setLoading(true)
        API.post('enroll/', { subjectID: idInput, studentsID: [currentUser.studentID] })
            .then(function (response) {
                setLoading(false)
                setIDInput('')
                console.log(response.data)
                getUserSubject()
                showMessage({
                    message: `Enroll ${subjectName} Success`,
                    type: "success",
                });
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error)
            })
    }
    const drop = () => {
        setLoading(true)
        console.log({ studentID: currentUser.studentID, subjectID: selectedVal })
        API.post('drop/', { studentID: [currentUser.studentID], subjectID: selectedVal })
            .then((response) => {
                getUserSubject()
                setLoading(false)
                setSelected(null)
                setDataSelection([])
                showMessage({
                    message: "Drop Success",
                    type: "success",
                });
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const getUserSubject = () => {
        setLoading(true)

        API.post('getSubjectByID/', { uid: currentUser.uid })
            .then((res) => {
                setSubjectsID(res.data)
            })
            .catch((err) =>
                console.log(err))
    }
    const getSubjectDetail = async () => {
        const subDetail = subjectsID.map(async (subject) => {
            const res = await API.post('getSubject/', { subjectID: subject })
            const detail = await res.data
            return { label: detail.subjectName, value: subject }
        })
        const results = await Promise.all(subDetail)
        setLoading(false)
        setDataSelection(results)
    }
    return (
        <View style={styles.screen}>
            {loading && <ActivityIndicator size="large" color={Colors.primaryColor} />}
            <View style={styles.box}>
                <View style={{ width: '100%' }}>
                    <Text style={styles.textTitle}>Enroll Subject</Text>
                </View>
                <View style={styles.selectContainer}>
                    <Text>Enter SubjectID: </Text>
                    {subjectName !== '' ?
                        <View style={styles.subNameContainer}>
                            <Text style={styles.subjectName}>{subjectName.length > 12 ? subjectName.slice(0, 12) + '...' : subjectName}</Text>
                            <TouchableOpacity onPress={() => { setSubjectName(''); setIDInput('') }}>
                                <Entypo name="circle-with-cross"
                                    size={22} color='gray'
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        <TextInput style={
                            pickerSelectStyles.inputIOS}
                            value={idInput}
                            maxLength={8}
                            keyboardType='numeric'
                            onChangeText={(txt) => { setIDInput(txt); console.log(txt) }}
                        />
                    }

                </View>
                <TouchableOpacity style={{ ...styles.button, ...subjectName !== '' ? { backgroundColor: Colors.primaryColor } : { backgroundColor: 'grey' } }}
                    onPress={enroll}
                    disabled={idInput.length !== 8}>
                    <Text style={{ color: 'white' }}>Enroll</Text>
                </TouchableOpacity>
            </View>
            {/* ======================================== drop ==================================================== */}
            <View style={styles.box}>
                <View style={{ width: '100%' }}>
                    <Text style={styles.textTitle}>Drop Subject</Text>
                </View>
                <View style={styles.selectContainer}>
                    <Text>Select Subject: </Text>
                    <Select
                        style={pickerSelectStyles}
                        onValueChange={(value) => setSelected(value)}
                        value={selectedVal}
                        items={dataSelection}
                    />
                </View>
                <TouchableOpacity style={{ ...styles.button, ...selectedVal !== null ? { backgroundColor: Colors.primaryColor } : { backgroundColor: 'grey' } }}
                    onPress={drop}
                    disabled={selectedVal === null} >
                    <Text style={{ color: 'white' }}>Drop</Text>
                </TouchableOpacity>
            </View>

        </View >

    )
}
SubjectScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Manage Subject      '
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10
    },
    textTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primaryColor
    },
    box: {
        borderRadius: 15,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
        width: 100,
        marginHorizontal: 20,
    },
    subNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 4,
        paddingHorizontal: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        width: 200,
        height: 40
    },
    subjectName: {
        color: Colors.highLigthColor,
        fontSize: 18,
        marginRight: 5
    }
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        width: 200,
        height: 40
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 0.5,
        borderColor: '#d9d9d9',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        width: 200,
        height: 40
    },
});
export default SubjectScreen