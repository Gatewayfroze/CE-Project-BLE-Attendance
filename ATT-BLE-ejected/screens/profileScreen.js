import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    ActivityIndicator
} from 'react-native'
import Colors from '../constants/Colors'
import API from '../assets/API'
import Color from '../constants/Colors'
import Button from '../components/button'
const ProfileScreen = props => {
    const [currentUser, setCurrentUser] = useState('');
    const [userDetail, setUserDetail] = useState('');
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getToken()
    }, []);
    useEffect(() => {
        if (currentUser !== '') {
            getCurrentUserDetail()
        }
    }, [currentUser])

    getToken = async () => {
        try {
            let userData = await AsyncStorage.getItem("userData");
            let data = JSON.parse(userData);
            setCurrentUser(data.user)
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    const changePassword = () => {
        API.post('/changePassword', { uid: currentUser.uid })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const getCurrentUserDetail = () => {
        setLoading(true)
        const stdID = currentUser.email.replace('@kmitl.ac.th', '')
        API.post('getStudent/', { studentID: stdID })
            .then((res) => {
                setUserDetail(res.data)
            })
            .catch((err) =>
                console.log(err))
    }

    const deleteToken= async() =>{
        try {
          await AsyncStorage.removeItem("userData").then(()=>{
            props.navigation.navigate({
                routeName: 'login'
            })
          })
        } catch (err) {
          console.log(`The error is: ${err}`)
        }
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
                    {userDetail !== '' ? <React.Fragment>
                        <Text style={styles.detailText}>{userDetail.name} {userDetail.surname}</Text>
                        <Text style={styles.detailText}>{userDetail.email.replace('@kmitl.ac.th', '')}</Text>
                        <Text style={styles.detailText}>{userDetail.faculty}</Text>
                        <Text style={styles.detailText}>{userDetail.year}</Text>
                    </React.Fragment> : <ActivityIndicator />
                    }
                </View>
            </View>

            <Button style={styles.buttonSize} click={changePassword}>
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Change Password
                </Text>
            </Button>

            <Button style={styles.buttonSize} click={
                () => deleteToken()
                
            }>
                <Text style={{ color: 'white',fontSize: 18 }}>
                    Logout
                </Text>
            </Button>
        </View>
    )
}
ProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Profile      '
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
        height: '40%',
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
    detailText: {
        fontSize: 18
    },
    buttonSize: {
        height: 45,
        width: '40%',
        marginBottom: 15
    }
});
export default ProfileScreen