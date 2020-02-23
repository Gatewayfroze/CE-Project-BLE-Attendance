import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'

const SubjectCheckIn = props => {
    return (
        <View style={props.disabled?{...styles.itemSubject,backgroundColor:'#d1d1d1'}:{...styles.itemSubject,backgroundColor:'white'}}>
            <View style={styles.subjectDetailContainer}>
                <View style={styles.subjectTitle}>
                    <Text style={props.disabled?{...styles.textTitle,color: 'gray'}:{...styles.textTitle,color: Colors.highLigthColor}}>{props.title}</Text>
                </View>
                <View style={props.disabled?{
                    flex: 1,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 2,
                }:{
                    flex: 1,
                    borderBottomColor: Colors.brigthCOlor,
                    borderBottomWidth: 2,
                }} />
                <View style={styles.subjectDetail}>
                    <Text style={{ fontSize: 13}} >{props.detail}</Text>
                    <TouchableOpacity disabled={props.disabled}  style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} onPress={props.onClick}>
                        <Text style={{ fontSize: 13, color: 'orange' }}>เวลาเรียน 1/10 </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity disabled={props.disabled} style={props.disabled ?{ ...styles.buttonCircle, backgroundColor: 'gray' }:
                    { ...styles.buttonCircle, backgroundColor: Colors.highLigthColor }}
                    onPress={() => console.log('checkIn' + props.title)}>
                    <Text style={{ fontSize: 22, color: 'white' }}>Check</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
SubjectCheckIn.defaultProps = {
    disabled: false
  };
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