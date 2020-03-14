import React from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import Colors from '../constants/Colors'

import Button from '../components/button'


const ProfileScreen = props => {
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
                    <Text style={styles.detailText}>นิตินนท์ เพ็งเลา</Text>
                    <Text style={styles.detailText}>5910734</Text>
                    {/* <Text style={styles.detailText}>วิศวกรรมศาสตร์</Text> */}
                </View>
            </View>
            <Button style={styles.buttonSize} click={
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
        width: '40%',
        marginBottom: 15
    }
});
export default ProfileScreen