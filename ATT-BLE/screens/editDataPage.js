import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native'
import Colors from '../constants/Colors'
import API from '../constants/API'
import Color from '../constants/Colors'
import Button from '../components/button'

const EditPage = ({ navigation }, ...props) => {
    const [disable, setDisable] = useState(true)
    const [loading, setLoading] = useState(false)
    const userDetail = navigation.state.params.userData
    const uid = navigation.state.params.uid
    const [data, setData] = useState({
        studentID: userDetail.email.replace('@kmitl.ac.th', ''),
        name: userDetail.name + ' ' + userDetail.surname,
        year: userDetail.year,
        faculty: userDetail.faculty
    })
    useEffect(() => {
        if (data.name === '' ||
            data.year === '' ||
            data.faculty === ''
        ) {
            setDisable(true)
        } else {
            setDisable(false)
        }

    }, [data])
    const updateProfileHandle = () => {
        const name_temp = data.name.split(' ')[0]
        const surname_temp = data.name.split(' ')[1]
        API.post('/updateStudent', {
            uid: uid,
            name: name_temp,
            surname: surname_temp,
            year: data.year,
            faculty: data.faculty
        }).then(() => {
            navigation.goBack()
            navigation.state.params.refreshFN()
        }).catch((err)=>{console.log(err)})

    }
    return (
        <View style={styles.screen}>
            <View style={styles.profileContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>ชื่อ</Text>
                    <Text style={styles.titleText}>รหัสนักศึกษา</Text>
                    <Text style={styles.titleText}>คณะ</Text>
                    <Text style={styles.titleText}>ชั้นปี</Text>
                </View>
                <View style={styles.detailContainer}>
                    {userDetail ? <React.Fragment>
                        <View style={styles.inputView}>
                            <TextInput style={styles.textInput}
                                placeholder="Name - Surname"
                                value={data.name}
                                onChangeText={name => setData({ ...data, name })}
                                placeholderTextColor="grey" />
                        </View>
                        <View style={{ ...styles.inputView, backgroundColor: '#dbdbdb', borderColor: 'gray' }}>
                            <Text style={styles.detailText}>{data.studentID}</Text>
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
                            />
                        </View>
                    </React.Fragment> : null
                    }
                </View>
            </View>

            <Button style={styles.buttonSize} disable={disable} click={updateProfileHandle}>
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Save Data
                </Text>
            </Button>
        </View>
    )
}
EditPage.navigationOptions = navData => {
    return {
        headerTitle: 'Edit Profile      '
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        width: '80%',
        paddingVertical: 30,
        paddingLeft: '10%',
        borderRadius: 20,
        marginVertical: 20,
        // shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,

    },
    titleContainer: {
        flex: 1,
        justifyContent: "space-between",
        // backgroundColor: 'red',
        width: '100%',
        height: '100%',

    },
    detailContainer: {
        flex: 2,
        justifyContent: "space-between",
        // backgroundColor: 'green',
        width: '100%',
        height: '100%'
    },
    text: {
        fontFamily: 'TH-sarabun'
    },
    titleText: {
        color: Colors.highLigthColor,
        fontSize: 18
    },
    buttonSize: {
        height: 45,
        width: '60%',
        marginBottom: 15,
        borderRadius: 25
    },
    textInput: {
        height: 50,
    },
    inputView: {
        height: 40,
        width: "65%",
        backgroundColor: "white",
        borderColor: Colors.primaryColor,
        borderWidth: 2,
        paddingLeft: 10,
        borderRadius: 25,
        justifyContent: "center",
    },
});
export default EditPage