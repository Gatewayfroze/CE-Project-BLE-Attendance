import React from 'react'
import { View, Text,TouchableHighlight, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

const SubjectCheckIn = props => {
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
                <TouchableHighlight style={styles.buttonCircle} onPress={()=>console.log('checkIn'+props.title)}>
                    <Text style={{ fontSize: 22, color: 'white' }}>Click</Text>
                </TouchableHighlight> 
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
    buttonCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primaryColor,
        justifyContent: "center",
        alignItems: "center"
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
        fontSize: 25,
        fontFamily: 'TH-sarabun-bold',
        color: Colors.highLigthColor
    }
})
export default SubjectCheckIn