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
  Alert,
  ToastAndroid,
  ScrollView,
} from 'react-native';

import {Picker, Content, Header} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { scale } from 'react-native-size-matters';

export default function Profile({navigation}) {
  const [name, setname] = useState('');
  const [studentid, setstudentid] = useState('');
  const [contact, setcontact] = useState('');
  // const [confirmpassword, setconfirmpassword] = useState('');
  const [email, setEmail] = useState('');
  const [userid, setuserid] = useState('');
  const [userData, setuserData] = useState({});

  useEffect(() => {
    retrieveLoginData();
  }, []);

  const retrieveLoginData = async () => {
    console.log('Async function chala k nhe');
    try {
      const uid = await AsyncStorage.getItem('userId');
      setuserid(uid);
    } catch (error) {
      // Error retrieving data
      console.log('data nhe aya re = ', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [userid]);

  const getUserData = async () => {
    const userRef = firestore().collection('users').doc(userid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      let tempobj = {
        uid: doc.id,
        name: doc.data().student_name,
        email: doc.data().email,
        user_designation: doc.data().designation,
        publish_time: doc.data().publishTime,
        student_id: doc.data().student_id,
        student_contact: doc.data().student_contact,
      };
      setstudentid(tempobj.student_id);
      setEmail(tempobj.email);
      setname(tempobj.name);
      setcontact(tempobj.student_contact);
      setuserData(tempobj);
    }
  };

  const updateData = () => {
    let today = new Date();
    firestore()
      .collection('users')
      .doc(userid)
      .update({
        student_name: name.toLowerCase(),
        student_id: studentid,
        student_contact: contact,
        // city: city.toLowerCase(),
        email: email.toLowerCase(),
      })
      .then(() => {
        console.log('Data Updated!');
        ToastAndroid.show('Data Updated', ToastAndroid.SHORT);
        // navigation.navigate('Login');
      });
  };

  return (
    <View style={styles.maincontainer}>
      <Header style={{backgroundColor: '#fff'}}>
        <View
          style={{
            width: '8%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <FontAwesome
              style={styles.mainIcon}
              name="bars"
              color="grey"
              size={26}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '92%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              // textAlign: 'center',
              // margin: 15,
              color: '#0c54a3',
            }}>
            Edit profile
          </Text>
        </View>
      </Header>

      <View style={{height:'90%',width:'100%'}}>
      <ScrollView style={{height:'100%'}}>
        <KeyboardAvoidingView style={styles.container} behavior="=padding">
        <Text
          style={{
            fontSize: 18,
                color: '#0c54a3',
                fontWeight: '600',
                textAlign: 'left',
                margin: 10,
          }}>
          Update your details here
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            keyboardType="default"
            placeholder="Name"
            style={styles.input}
            placeholderTextColor={'grey'}
            onChangeText={text => setname(text)}
          />

          <TextInput
            value={studentid}
            keyboardType="numeric"
            placeholder="Student ID"
            style={styles.input}
            placeholderTextColor={'grey'}
            onChangeText={text => setstudentid(text)}
          />

          <TextInput
            value={contact}
            keyboardType="numeric"
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
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              updateData();
            }}
            style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>Update</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('DChecking')}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'left',
              margin: 10,
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },

  container: {
    height:scale(600),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },

  main: {
    // flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0c54a3',
  },

  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  inputContainer: {
    width: '80%',
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
    borderColor:'#0c54a3',
    borderWidth:1
  },

  buttonContainer: {
    width: '60%',
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
    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },

  buttonOutline: {
    backgroundColor: '#0c54a3',
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
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutlineText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  img: {
    height: 100,
    width: 170,
  },

  scrollView: {
    marginHorizontal: 20,
  },
});
