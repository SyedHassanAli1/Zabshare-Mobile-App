import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Container, Content, Header} from 'native-base';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const SignOut = ({navigation}) => {
  useEffect(() => {
    LogoutFunction();
  }, []);

  const LogoutFunction = async () => {
    try {
      await AsyncStorage.setItem('userId', '');
      await AsyncStorage.setItem('userContact', '');
      await AsyncStorage.setItem('userName', '');
      await AsyncStorage.setItem('userEmail', '');
      await AsyncStorage.setItem('userDesignation', '');
      await AsyncStorage.setItem('studentId', '');
      ToastAndroid.show('Logout Successfully...', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      // Error saving data
      console.log('Error saving data = ', error);
    }
  };

  return (
    <View style={styles.maincontainer}>
      {/* <Header style={{backgroundColor: '#fff'}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 15,
            color: '#0c54a3',
          }}>
          Setting
        </Text>
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => LogoutFunction()}
          style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>SignOut</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('DChecking')}
          style={styles.buttonOutline}>
          <Text
            style={{
              fontSize: 16,
              color: '#0c54a3',
              fontWeight: '500',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

//handle signout

// const handleSignOut = navigation => {
//   auth()
//     .signOut()
//     .then(() => {
//       navigation.navigate('Login');
//     })

//     .catch(error => alert(error.message));
// };

export default SignOut;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },

  buttonOutline: {
    backgroundColor: 'white',
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 5,

    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutlineText: {
    color: '#0c54a3',
    fontWeight: '700',
    fontSize: 16,
  },
});
