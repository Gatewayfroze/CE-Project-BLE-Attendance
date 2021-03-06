import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import Button from '../components/button'
const StatSubject = props => {
    return (
        <View style={styles.itemSubject}>
            <View style={styles.subjectDetailContainer}>
                <View style={styles.subjectTitle}>
                    <Text style={styles.textTitle}>{props.title}</Text>
                </View>
                <View style={{
                    flex: 1,
                    borderBottomColor: Colors.brigthCOlor,
                    borderBottomWidth: 2,
                }} />
                <View style={styles.subjectDetail}>
                    <Text>{props.detail}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} click={props.onClick}>
                    <Text style={{ fontSize: 15, color: 'white' }}>View Stat</Text>
                </Button>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    itemSubject: {
        height: 100,
        borderRadius: 15,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: '85%',
        height: '45%',
        borderRadius: 20,
    },
    subjectDetailContainer: {
        flexDirection: 'column',
        flex: 3,
        justifyContent: 'center',
        paddingRight: 10
    },
    subjectTitle: {
        flex: 2,
    },
    subjectDetail: {
        flex: 2,
        marginVertical: 10
    },
    textTitle: {
        fontSize: 20,
        color: Colors.highLigthColor
    }
})
export default StatSubject