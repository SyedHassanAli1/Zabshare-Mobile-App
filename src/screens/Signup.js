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
  Content,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {Picker, Header} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';
import DropdownIcon from 'react-native-vector-icons/Entypo';
import {scale} from 'react-native-size-matters';

const Signup = ({navigation}) => {
  const [name, setname] = useState('');
  const [studentid, setstudentid] = useState(null);
  const [contact, setcontact] = useState(null);
  // const [confirmpassword, setconfirmpassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [designation, setdesignation] = useState('');
  const [designationArray, setdesignationArray] = useState([
    'driver',
    'passenger',
  ]);

  const userData = () => {
    let today = new Date();
    firestore()
      .collection('users')
      .doc(`${auth().currentUser.uid}`)
      .set({
        student_name: name.toLowerCase(),
        student_id: studentid,
        student_contact: contact,
        // city: city.toLowerCase(),
        email: email.toLowerCase(),
        password: password,
        publishTime: today,
        designation: designation,
        verification_status: 'pending',
      })
      .then(() => {
        console.log('User added!');
        navigation.navigate('Login');
      });
  };

  const signup = () => {
    auth()
      .createUserWithEmailAndPassword(email.toLowerCase(), password)
      .then(data => {
        console.log('User account created & signed in!');
        ToastAndroid.show('User Account Created', ToastAndroid.SHORT);
        userData();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.SHORT,
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          ToastAndroid.show(
            'That email address is invalid!',
            ToastAndroid.SHORT,
          );
        }
        console.error(error);
      });
  };

  const Validation = () => {
    if (!name.trim()) {
      // console.log('Enter Name')
      ToastAndroid.show('Enter Name', ToastAndroid.SHORT);
    } else if (studentid == null || studentid.length < 7) {
      console.log('Enter Correct Student ID');
      ToastAndroid.show('Enter Correct Student ID', ToastAndroid.SHORT);
    } else if (contact == null || contact.length < 11) {
      console.log('Enter Contact');
      ToastAndroid.show('Enter Correct Contact', ToastAndroid.SHORT);
    } else if (!email.trim()) {
      console.log('Enter Email');
      ToastAndroid.show('Enter Email', ToastAndroid.SHORT);
    } else if (!password.trim()) {
      ToastAndroid.show('Enter Password', ToastAndroid.SHORT);
      console.log('Enter Password');
    } else if (!designation.trim()) {
      ToastAndroid.show('Please Select Designation First', ToastAndroid.SHORT);
      console.log('Please Select Value');
    } else {
      signup();
      // console.log(designation,'asdadsdasdasdasds')
    }
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
          User Signup
        </Text>
      </Header>

      <View style={{height: '90%', width: '100%'}}>
        <ScrollView style={{height: '100%'}}>
          <KeyboardAvoidingView style={styles.container} behavior="=padding">
            <Image
              style={styles.img}
              source={require('../assets/images/logo.png')}
            />

            <View style={styles.inputContainer}>
              <TextInput
                keyboardType="default"
                placeholder="Name"
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={text => setname(text)}
              />

              <TextInput
                keyboardType="numeric"
                placeholder="Student ID"
                maxLength={7}
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={text => setstudentid(text)}
              />

              <TextInput
                keyboardType="numeric"
                maxLength={11}
                placeholder="Contact"
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={text => setcontact(text)}
              />

              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                placeholderTextColor={'grey'}
              />

              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                placeholderTextColor={'grey'}
                secureTextEntry
              />

              <SelectDropdown
                data={designationArray}
                buttonStyle={styles.dropdownContainerStyle}
                buttonTextStyle={styles.buttonText}
                rowTextStyle={styles.rowText}
                defaultButtonText="Select designation"
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  {
                    selectedItem == 'driver'
                      ? setdesignation('0')
                      : setdesignation('1');
                  }
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                renderDropdownIcon={() => {
                  return (
                    <DropdownIcon
                      name="chevron-down"
                      color={'#444'}
                      size={20}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  Validation();
                }}
                style={styles.buttonOutline}>
                <Text style={styles.buttonOutlineText}>Register</Text>
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
                You already have an account?
              </Text>

              <TouchableOpacity
                style={styles.button2}
                disabled={false}
                onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#0c54a3',
                    fontWeight: '500',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}>
                  Login
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => navigation.navigate('Driver')}> */}

              {/* <TouchableOpacity onPress={() => navigation.navigate('Passenger')}>
           
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  textAlign: 'left',
                  margin: 10,
                }}>
                D/P
              </Text>
            </TouchableOpacity> */}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    height: scale(600),
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
    borderRadius: 5,
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
  },

  button: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },

  buttonOutline: {
    backgroundColor: '#0c54a3',
    width: '80%',
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

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutlineText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  img: {
    height: 100,
    width: 170,
  },

  dropdownContainerStyle: {
    backgroundColor: 'white',
    height: '13%',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#5499C7',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
    marginTop: '3%',
    borderRadius: 5,
    borderColor: '#0c54a3',
    borderWidth: 1,
  },

  buttonText: {
    textAlign: 'left',
    width: '10%',
    color: 'grey',
    textTransform: 'capitalize',
  },

  rowText: {
    // backgroundColor:'yellow',
    justifyContent: 'flex-start',
    textAlign: 'left',
    color: '#606060',
    textTransform: 'capitalize',
  },
});
