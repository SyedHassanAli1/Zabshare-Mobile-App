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
import SelectDropdown from 'react-native-select-dropdown';
import DropdownIcon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';

export default function Feedback({navigation, route}) {
  const navData = route.params;
  const [userUid, setuserUid] = useState('');
  const [userName, setuserName] = useState('');

  const [ScheduleDate, setScheduleDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [txt, setTxt] = useState('');
  const [fare, setFare] = useState(null);

  const [experience, setexperience] = useState('');
  const [rateArray, setrateArray] = useState([
    'Excellent',
    'Very Good',
    'Good',
    'Fair',
    'Poor',
  ]);

  const [behaviour, setbehaviour] = useState('');
  const [behaveArray, setbehaveArray] = useState(['Good', 'Poor']);

  useEffect(() => {
    retrieveLoginData();
  }, []);

  const retrieveLoginData = async () => {
    console.log('Async function chala k nhe');
    try {
      const uid = await AsyncStorage.getItem('userId');
      const user_name = await AsyncStorage.getItem('userName');
      // const rides_count = await AsyncStorage.getItem('rideCount');
      // const user_contact = await AsyncStorage.getItem('userContact');

      setuserName(user_name);
      setuserUid(uid);
      console.log(uid, user_name);
    } catch (error) {
      // Error retrieving data
      console.log('data nhe aya re = ', error);
    }
  };

  const postFeedback = () => {
    console.log('-------------', ScheduleDate.toLocaleString());
    let today = new Date();
    firestore()
      .collection('feedback')
      .add({
        driver_uid: navData.id,
        driver_name: navData.name,
        user_uid: userUid,
        user_name: userName,
        feedback: experience,
        behaviour: behaviour,
        publishtime: today,
      })
      .then(() => {
        ToastAndroid.show('Feedback posted succcessfully', ToastAndroid.SHORT);
        navigation.goBack();
        console.log('Feedback posted succcessfully');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const containsSpecialChars = str => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };

  const Validation = () => {
    if (!behaviour.trim()) {
      // console.log('Enter Name')
      ToastAndroid.show('Enter Number of seats', ToastAndroid.SHORT);
    } else if (!experience.trim()) {
      // console.log('Enter Email');
      ToastAndroid.show('Enter Area', ToastAndroid.SHORT);
    } else {
      postFeedback();
    }
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
            Feedback
          </Text>
        </View>
      </Header>

      <View style={styles.bodyContainer}>
        <ScrollView
          style={{
            height: '100%',
          }}>
          <KeyboardAvoidingView style={styles.container} behavior="=padding">
            <Text
              style={{
                fontSize: 18,
                color: '#0c54a3',
                fontWeight: '600',
                textAlign: 'left',
                margin: 10,
              }}>
              Rate your experience
            </Text>

            {/* <View style={styles.inputContainer}>
              <TextInput
                value={noOfSeat}
                keyboardType="numeric"
                placeholder="Driver Id"
                maxLength={1}
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={text => setnoOfSeat(text)}
              />

              <TextInput
                value={noOfSeat}
                keyboardType="numeric"
                placeholder="Driver Name"
                maxLength={1}
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={text => setnoOfSeat(text)}
              />
            </View> */}

            <SelectDropdown
              data={rateArray}
              buttonStyle={styles.dropdownContainerStyle}
              buttonTextStyle={styles.buttonText}
              rowTextStyle={styles.rowText}
              defaultButtonText="How's your experience"
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setexperience(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={() => {
                return (
                  <DropdownIcon name="chevron-down" color={'#444'} size={20} />
                );
              }}
              dropdownIconPosition={'right'}
            />

            <SelectDropdown
              data={behaveArray}
              buttonStyle={styles.dropdownContainerStyle}
              buttonTextStyle={styles.buttonText}
              rowTextStyle={styles.rowText}
              defaultButtonText="Driver behaviour"
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setbehaviour(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={() => {
                return (
                  <DropdownIcon name="chevron-down" color={'#444'} size={20} />
                );
              }}
              dropdownIconPosition={'right'}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  // postRide();
                  Validation();
                }}
                style={styles.buttonOutline}>
                <Text style={styles.buttonOutlineText}>Send</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('PChecking')}>
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
            </View>
            {/* 
            <TouchableOpacity onPress={() => navigation.navigate('Driver map')}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  textAlign: 'left',
                  margin: 10,
                  color: 'black'
                }}>
                Next
              </Text>
            </TouchableOpacity> */}
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
    height: 550,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginTop: '25%',
  },

  main: {
    flex: 1,
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
    shadowColor: '#5499C7',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
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

  dropdownContainerStyle: {
    backgroundColor: 'white',
    height: '8%',
    width: '80%',
    alignItems: 'center',
    shadowColor: '#5499C7',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
    marginTop: '3%',
    borderRadius: 5,
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

  bodyContainer: {
    height: '90%',
    width: '100%',
    // alignItems: 'center',
    // backgroundColor:'yellow'
  },

  bodyContainer2: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingBottom: '120%',
    // backgroundColor:'yellow'
  },

  buttonoutlinetext: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    color: 'grey',
    shadowColor: '#5499C7',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
  },
});
