import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'

const SubjectCheckIn = props => {
    return (
        <View style={props.status? {...styles.itemSubject,backgroundColor:'white'}:{...styles.itemSubject,backgroundColor:'#d1d1d1'}}>
            <View style={styles.subjectDetailContainer}>
                <View style={styles.subjectTitle}>
                    <Text style={props.status?{...styles.textTitle,color: Colors.highLigthColor}:{...styles.textTitle,color: 'gray'}}>{props.title}</Text>
                </View>
                <View style={props.status?{
                    flex: 1,
                    borderBottomColor: Colors.brigthCOlor,
                    borderBottomWidth: 2,
                }:{
                    flex: 1,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 2,
                }} />
                <View style={styles.subjectDetail}>
                    <Text>{props.detail}</Text>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} onPress={props.onClick}>
                        <Text style={{ fontSize: 15, color: 'orange' }}>เวลาเรียน 1/10 </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableHighlight style={props.status ?
                    { ...styles.buttonCircle, backgroundColor: Colors.highLigthColor } :
                    { ...styles.buttonCircle, backgroundColor: 'gray' }}
                    onPress={() => console.log('checkIn' + props.title)}>
                    <Text style={{ fontSize: 22, color: 'white' }}>Check</Text>
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
        justifyContent: "center",
        alignItems: "center"
    },
    buttonCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'gray',
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
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 25,
        fontFamily: 'TH-sarabun-bold',
        
    }
})
export default SubjectCheckIn