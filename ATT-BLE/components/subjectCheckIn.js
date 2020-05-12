import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import API from '../constants/API'
const SubjectCheckIn = props => {
    let tempName = props.title
    tempName = tempName.length > 20 ? `${tempName.slice(0, 20)}...` : tempName
    return (
        <View style={props.disabled ? { ...styles.itemSubject, backgroundColor: '#d1d1d1' } : { ...styles.itemSubject, backgroundColor: 'white' }}>
            <View style={styles.subjectDetailContainer}>
                <View style={styles.subjectTitle}>
                    <Text style={props.disabled ? { ...styles.textTitle, color: 'gray' } : { ...styles.textTitle, color: Colors.highLigthColor }}>{tempName}</Text>
                </View>
                <View style={props.disabled ? {
                    flex: 1,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 2,
                } : {
                        flex: 1,
                        borderBottomColor: Colors.brigthCOlor,
                        borderBottomWidth: 2,
                    }} />
                <View style={styles.subjectDetail}>
                    {/* <TouchableOpacity disabled={props.disabled} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} onPress={props.onClick}> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                        <Text style={{ fontSize: 13, color: 'orange' }}>{'ห้อง: ' + props.room}</Text>
                    </View>
                    <Text style={{ fontSize: 13 }} >{props.detail}</Text>
                    {/* </TouchableOpacity> */}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity disabled={props.disabled} style={props.disabled ? { ...styles.buttonCircle, backgroundColor: 'gray' } :
                    { ...styles.buttonCircle, backgroundColor: Colors.highLigthColor }}
                    onPress={props.sendTransaction}>
                    <Text style={{ fontSize: 17, color: 'white' }}>Check-In</Text>
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
        fontSize: 18,
    }
})
export default SubjectCheckIn