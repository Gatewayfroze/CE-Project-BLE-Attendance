import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../constants/Colors'

const DetailStatScreen = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.statContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>จำนวนครั้งที่เข้าเรียน</Text>
                    <Text style={styles.titleText}>มา</Text>
                    <Text style={styles.titleText}>สาย</Text>
                    <Text style={styles.titleText}>ขาด</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>10</Text>
                    <Text style={styles.detailText}>90%</Text>
                    <Text style={styles.detailText}>5%</Text>
                    <Text style={styles.detailText}>5%</Text>
                </View>
            </View>
        </View>
    )
}
DetailStatScreen.navigationOptions = navData => {
    return {
        headerTitle: 'รายละเอียดการเข้าเรียน'
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45%',
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
        flex: 2,
        justifyContent: "space-between",
        // backgroundColor: 'red',
        width: '100%',
        height: '100%',

    },
    detailContainer: {
        flex: 1,
        justifyContent: "space-between",
        // backgroundColor: 'green',
        width: '100%',
        height: '100%'
    },
    text: {
    },
    titleText: {
        color: Colors.highLigthColor,
        fontSize: 28
    },
    detailText: {
        fontSize: 28
    },
    buttonSize: {
        height: 35,
        width: '30%'
    }
})
export default DetailStatScreen