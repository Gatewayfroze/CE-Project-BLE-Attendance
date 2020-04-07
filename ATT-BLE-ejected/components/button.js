import React from 'react'
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'

const Button = props => {
    
    const styleBT=props.disable?styles.buttonDisableStyle:styles.buttonStyle
    return (
        <TouchableHighlight style={{
            ...styleBT,
            ...props.style
        }} onPress={props.click} disabled={props.disable}>
            {props.children}
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: Colors.highLigthColor,
        alignItems: "center"
    },
    buttonDisableStyle: {
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: 'gray',
        alignItems: "center"
    }
})
export default Button