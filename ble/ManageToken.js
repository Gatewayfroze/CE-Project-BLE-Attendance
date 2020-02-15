import {AsyncStorage} from 'react-native';
export const storeToken =async (user)=> {
    try {
       await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
 

  