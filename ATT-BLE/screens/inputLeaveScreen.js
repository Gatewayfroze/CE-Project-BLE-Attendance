import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Color from '../constants/Colors'
import Button from '../components/button'
const InputLeaveScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>
                กรอกเหตุผลในการลา พร้อมอัพโหลดหลักฐาน
            </Text>
            <View style={styles.leaveInputContainer}>
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
                <Button style={{ height: 50, width: '30%' ,marginBottom:20,borderRadius:40}}>
                    <Text style={{fontSize:30 ,color:'white', fontFamily:'TH-sarabun'}}>Send</Text>
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
        justifyContent:'space-between',
        width: '80%',
        borderRadius: 20,
        alignContent: 'center',
        marginVertical: 20,
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
        margin: 15,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        width: 300,
        justifyContent: "flex-start"
    }
})
export default InputLeaveScreen