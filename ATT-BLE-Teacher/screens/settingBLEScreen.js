import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import Colors from '../constants/Colors'
import Button from '../components/button'
const settingScreen = props => {
    return (
        <View>
            <View style={styles.itemSubject}>
                <View style={styles.subjectDetailContainer}>
                    <View style={styles.subjectTitle}>
                        <Text style={styles.textTitle}>ECC-811</Text>
                    </View>
                    {/* ดเสเ่หกสาเ่สากดห่ส่ */}
                    <View style={{
                        backgroundColor: 'red',
                        borderBottomColor: Colors.brigthCOlor,
                        borderBottomWidth: 2,
                    }} />
                    <View style={styles.subjectDetail}>
                        <Text>MAC: 00-10-5A-44-12-B5</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20,fontFamily:'TH-sarabun'}}>เลือกวิชา</Text>
                    <TextInput style={{ borderColor: 'black', borderWidth: 1,fontSize:20,fontFamily :'TH-sarabun'}} placeholder='เลือกวิชาที่ต้องการตั้งค่า' />
                </View>
                <View style={{width:70,height:35,marginVertical:10}}>
                    <Button style={{
                        height:'100%'
                    }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Set</Text>
                    </Button>
                </View>

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
    },
    subjectDetail: {
        flex: 1,
        marginVertical: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 50,
        fontFamily: 'TH-sarabun-bold',
        color: Colors.highLigthColor
    }
})
export default settingScreen