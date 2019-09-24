import React from 'react'
import { View, Text,StyleSheet} from 'react-native'

const ProfileScreen = props => {
    return (
        <View>
            <Text>
                ครับ
            </Text>
        </View>
    )
}
ProfileScreen.navigationOptions = navData => {
    return{
        headerTitle:'Profile'
    }
}
const styles = StyleSheet.create({
    container: {
      fontFamily:'TH-sarabun',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      fontFamily:'TH-sarabun'
    },
  });
export default ProfileScreen