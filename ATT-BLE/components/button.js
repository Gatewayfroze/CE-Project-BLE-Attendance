import React from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'
const Button = props => {
    return (
        <TouchableHighlight style={{
            ...styles.buttonStyle,
            ...props.style
        }} onPress={props.click}>
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
    }
})
export default Button