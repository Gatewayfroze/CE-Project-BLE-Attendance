import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native'


import CheckBox from 'react-native-check-box'
import Select from 'react-native-picker-select';
import Colors from '../constants/Colors'
import Button from '../components/button'
import API from '../assets/API'

const settingScreen = ({ navigation }, ...props) => {
    const room = navigation.state.params.room
    const mac = navigation.state.params.mac
    const subjectList = navigation.state.params.subjectsDetail.map((data) => {
        return { label: data.subjectName, value: data.subjectID }
    })

    const [selectedSubject, setSelectedSubject] = useState(null)

    return (
        <View>
            <View style={styles.itemSubject}>
                <View style={styles.subjectDetailContainer}>
                    <View style={styles.subjectTitle}>
                        <Text style={styles.textTitle}>{room}</Text>
                    </View>
                    <View style={{
                        backgroundColor: 'red',
                        borderBottomColor: Colors.brigthCOlor,
                        borderBottomWidth: 2,
                    }} />
                    <View style={styles.subjectDetail}>
                        <Text>MAC: {mac}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.selectContainer}>
                        <Text>Select Subject: </Text>
                        <Select
                            style={pickerSelectStyles}
                            onValueChange={(value) => setSelectedSubject(value)}
                            value={selectedSubject}
                            items={subjectList}
                        />
                    </View>
                </View>

                <View style={{ width: 70, height: 35, marginVertical: 10 }}>
                    <Button style={{
                        height: '100%'
                    }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Set</Text>
                    </Button>
                </View>
                <CheckBox
                    style={{ flex: 1, padding: 10 }}
                    isChecked={true}
                    leftText={"CheckBox"}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    itemSubject: {
        height: 120,
        borderRadius: 15,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
        backgroundColor: Colors.highLigthColor,
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
        marginBottom: 5,
    },
    subjectDetail: {
        flex: 1,
        marginVertical: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 50,
        color: Colors.highLigthColor
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        width: 200,
        height: 40
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 0.5,
        borderColor: '#d9d9d9',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
export default settingScreen