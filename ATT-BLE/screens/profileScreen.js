import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

import Button from '../components/button'
const ProfileScreen = props => {
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
                    <Text style={styles.detailText}>นิตินนท์ เพ็งเลา</Text>
                    <Text style={styles.detailText}>5910734</Text>
                    <Text style={styles.detailText}>วิศวกรรมศาสตร์</Text>
                    <Text style={styles.detailText}>4</Text>
                </View>
            </View>
            <Button style={styles.buttonSize} click={
                ()=> props.navigation.navigate({
                    routeName:'login'
                })
                }>
                <Text style={{ color: 'white', fontFamily: 'TH-sarabun', fontSize: 25 }}>
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
        fontFamily: 'TH-sarabun-bold',
        color: Colors.highLigthColor,
        fontSize: 28
    },
    detailText: {
        fontFamily: 'TH-sarabun',
        fontSize: 28
    },
    buttonSize: {
        height: 35,
        width: '30%'
    }
});
export default ProfileScreen