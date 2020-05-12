import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import Colors from '../constants/Colors'
import API from '../constants/API'
import Button from '../components/button'


const ProfileScreen = props => {
    const [currentUser, setCurrentUser] = useState('');
    const [userDetail, setUserDetail] = useState('');
    const [loading, setLoading] = useState(true)
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
            console.log(data.user)
            setCurrentUser(data.user)
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    const getCurrentUserDetail = () => {
        setLoading(true)
        API.post('getUser/', { email: currentUser.email })
            .then((res) => {
                console.log(res.data)
                setUserDetail(res.data)
                setLoading(false)

            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            }
            )
    }
    const changePassword = () => {
        API.post('/changePassword', { uid: currentUser.uid })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const deleteToken = async () => {
        try {
            await AsyncStorage.removeItem("userData").then(() => {
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
                    <Text style={styles.titleText}>รหัสอาจารย์</Text>
                    {/* <Text style={styles.titleText}>คณะ</Text> */}
                </View>
                <View style={styles.detailContainer}>
                    {!loading ? <React.Fragment>
                        <Text style={styles.detailText}>{userDetail.name} {userDetail.surname}</Text>
                        <Text style={styles.detailText}>{userDetail.email}</Text>
                    </React.Fragment> : <ActivityIndicator />
                    }
                </View>
            </View>
            <Button style={styles.buttonSize} click={changePassword} >
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Change Password
                </Text>
            </Button>
            <Button style={styles.buttonSize} disable={loading} click={
                () => deleteToken()
            }>
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Logout
                </Text>
            </Button>
        </View>
    )
}
ProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Profile'
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
        height: '30%',
        width: '80%',
        paddingVertical: 50,
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
    },
    titleText: {
        color: Colors.highLigthColor,
        fontSize: 18
    },
    detailText: {
        // color:Colors.highLigthColor,
        fontSize: 18
    },
    buttonSize: {
        height: 45,
        width: '60%',
        marginBottom: 15,
        borderRadius: 25
    }
});
export default ProfileScreen