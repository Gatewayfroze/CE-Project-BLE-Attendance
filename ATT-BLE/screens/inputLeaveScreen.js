import React from 'react'
import { View, Text, TextInput, StyleSheet, Picker } from 'react-native'
import Color from '../constants/Colors'
import Button from '../components/button'
const InputLeaveScreen = props => {
    return (
        <View style={styles.screen}>
            <View style={{ flexDirection: 'row', height: '10%', width: '80%' ,marginVertical:20}}>
                <View style={{
                    flex: 1,
                    justifyContent: "space-between",
                    width: '100%',
                    height: '100%'
                }}>
                    <Text>เลือกวิชา</Text>
                    <Text>ลาวันที่</Text>
                </View>
                <View style={{
                    flex: 2,
                    justifyContent: "space-between",
                    width: '100%',
                    height: '100%'
                }}>
                    <TextInput style={styles.textInput} />
                    <TextInput style={styles.textInput} />
                </View>
            </View>
            <View style={styles.leaveInputContainer}>
                <View style={styles.titleContainer}>
                    <Text>หัวข้อการลา</Text>
                    <TextInput style={styles.textInput} />
                </View>

                <View style={styles.textAreaContainer} >

                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Type something"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                    />

                </View>
                <Button style={{ height: 50, width: '30%', marginBottom: 20, borderRadius: 40 }}>
                    <Text style={{ fontSize: 30, color: 'white', fontFamily: 'TH-sarabun' }}>Send</Text>
                </Button>
            </View>

        </View>
    )
}
InputLeaveScreen.navigationOptions = navData => {
    return {
        headerTitle: 'กรอกเหตุผลการลา'
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    leaveInputContainer: {
        justifyContent: 'space-between',
        width: '80%',
        borderRadius: 20,
        alignContent: 'center',
        alignItems: 'center',
        // ===========================
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,

    },
    textAreaContainer: {
        margin: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        width: 300,
        justifyContent: "flex-start"
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    selectSubContainer: {
        flexDirection: 'row'
    },
    selectTimeContainer: {
        flexDirection: 'row'
    },
    textInput: {
        borderColor: '#e3e3e3',
        borderWidth: 1,
        padding: 5,
        width: 200,
        marginHorizontal: 10
    }
})
export default InputLeaveScreen