import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ToastAndroid,
} from 'react-native';
import {Picker, Content, Header} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setuserId] = useState('');
  const [loginUserData, setloginUserData] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [data, setdata] = useState();

  const getUserData = async id => {
    const userRef = firestore().collection('users').doc(id);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      // console.log('Document data:', doc.data().designation);
      // console.log('Document data:', doc.data().name);
      // this.setState({user_name:doc.data().name})
      let tempobj = {
        uid: doc.id,
        name: doc.data().student_name,
        email: doc.data().email,
        user_designation: doc.data().designation,
        publish_time: doc.data().publishTime,
        student_id: doc.data().student_id,
        student_contact: doc.data().student_contact,
        status: doc.data().verification_status,
      };

      storeLoginData(tempobj);

      if (tempobj.status == 'accepted') {
        ToastAndroid.show('Login Successfull', ToastAndroid.SHORT);
        setEmail('');
        setPassword('');
        {
          tempobj.user_designation == 0
            ? navigation.navigate('Driver', {user_data: tempobj})
            : navigation.navigate('Passenger', {user_data: tempobj});
        }
      } else if (tempobj.status == 'pending') {
        ToastAndroid.show(
          'Please wait your request is on pending',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show('Admin rejected your requested', ToastAndroid.SHORT);
      }
    }
  };

  const storeLoginData = async tempobj => {
    try {
      await AsyncStorage.setItem('userId', tempobj.uid);
      await AsyncStorage.setItem('userContact', tempobj.student_contact);
      await AsyncStorage.setItem('userName', tempobj.name);
      await AsyncStorage.setItem('userEmail', tempobj.email);
      await AsyncStorage.setItem('userDesignation', tempobj.user_designation);
      await AsyncStorage.setItem('studentId', tempobj.student_id);
    } catch (error) {
      // Error saving data
      console.log('Error saving data = ', error);
    }
  };

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then(user => {
        setuserId(user.user.uid);
        console.log('kia mila = ', user.user.uid);

        getUserData(user.user.uid);
        // navigation.navigate('Checking');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          // console.log('Wrong Password');
          ToastAndroid.show('Wrong Password', ToastAndroid.SHORT);
        }

        if (error.code === 'auth/user-not-found') {
          // console.log('That email address is invalid!');
          ToastAndroid.show('Wrong Email', ToastAndroid.SHORT);
        }

        if (error.code === 'auth/invalid-email') {
          // console.log('That email address is invalid!');
          ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
        }
        console.error(error);
      });
  };

  const Validation = () => {
    if (!email.trim()) {
      // console.log('Enter Name')
      ToastAndroid.show('Enter Email', ToastAndroid.SHORT);
    } else if (!password.trim()) {
      ToastAndroid.show('Enter Password', ToastAndroid.SHORT);
      // console.log('Enter Password')
    } else {
      login();
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '757277888595-ke8c627iiqvr9ifbh9dcrs27em2iqs8k.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth()
        .signInWithCredential(credential)
        .then(user => {
          getUserInfo();
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('no');
      }
    }
  };

  const getUserInfo = async () => {
    const userInfo = await GoogleSignin.signInSilently();
    saveUserData(userInfo.user.name, userInfo.user.email);
    console.log(userInfo.user.name);
  };

  const saveUserData = (name, email) => {
    let today = new Date();
    firestore()
      .collection('users')
      .doc(`${auth().currentUser.uid}`)
      .set({
        student_name: name.toLowerCase(),
        student_id: '-',
        student_contact: '-',
        // city: city.toLowerCase(),
        email: email.toLowerCase(),
        password: '-',
        publishTime: today,
        designation: '1',
        verification_status: 'pending',
      })
      .then(() => {
        console.log('User added!');
        navigation.navigate('Passenger');
      });
  };

  return (
    <View style={styles.maincontainer}>
      <Header style={{backgroundColor: '#fff'}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 15,
            color: '#0c54a3',
          }}>
          User Login
        </Text>
      </Header>

      <KeyboardAvoidingView style={styles.container} behavior="=padding">
        <Image
          style={styles.img}
          source={require('../assets/images/logo.png')}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'grey'}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />

          <TextInput
            placeholderTextColor={'grey'}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              Validation();
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onGoogleButtonPress()}
            style={styles.googlebutton}>
            <Text style={styles.buttonText2}>Sign in with Google</Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 14,
              color: '#595958',
              padding: 6,

              justifyContent: 'center',
              textAlign: 'center',
              fontWeight: '400',
            }}>
            Are you new?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                fontSize: 16,
                color: '#0c54a3',
                fontWeight: '500',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              Create account
            </Text>
          </TouchableOpacity>

          {/* <GoogleSigninButton 
  style={{ width: 192, height: 48 }}
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={this._signIn}
  disabled={this.state.isSigninInProgress} /> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    width: '85%',
    borderColor: '#0c54a3',

    fontWeight: '300',
    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    color: '#595958',
    shadowColor: '#5499C7',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
    borderColor: '#0c54a3',
    borderWidth: 1,
  },

  buttonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  button: {
    backgroundColor: '#0c54a3',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 5,
    shadowColor: '#5499C7',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
  },

  buttonOutline: {
    backgroundColor: 'white',
    width: '100%',
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
    fontWeight: '600',
    fontSize: 16,
  },

  buttonText2: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  buttonOutlineText: {
    color: '#0c54a3',
    fontWeight: '700',
    fontSize: 16,
  },

  img: {
    height: 100,
    width: 170,
  },

  googlebutton: {
    backgroundColor: '#DB4437',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 5,
    shadowColor: '#5499C7',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
  },
});
