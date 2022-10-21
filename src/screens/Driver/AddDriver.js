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

export default function AddDriver({navigation}) {
  const [noOfSeat, setnoOfSeat] = React.useState('');
  const [scheduleTime, setScheduleTime] = React.useState('');
  const [scheduleDay, setScheduleDay] = React.useState('');
  const [area, setArea] = React.useState('');
  const [campus, setcampus] = useState('');
  const [driverUid, setdriverUid] = useState('');
  const [driverName, setdriverName] = useState('');
  const [vehicleNum, setvehicleNum] = useState('');
  const [vehicleModel, setvehicleModel] = useState('');
  const [rideCount, setrideCount] = useState(0);
  const [gotRideCounts, setgotRideCounts] = useState(null);
  const [ridesData, setridesData] = useState([]);
  const [driverContact, setdriverContact] = useState('');
  const [designationArray, setdesignationArray] = useState([
    'Szabist 79 Campus',
    'Szabist 90 Campus',
    'Szabist 100 Campus',
    'Szabist 153 Campus',
    'Szabist 154 Campus',
  ]);
  const [ScheduleDate, setScheduleDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [txt, setTxt] = useState('');
  const [fare, setFare] = useState(null);

  useEffect(() => {
    retrieveLoginData();
  }, []);

  const retrieveLoginData = async () => {
    console.log('Async function chala k nhe');
    try {
      const uid = await AsyncStorage.getItem('userId');
      const user_name = await AsyncStorage.getItem('userName');
      const rides_count = await AsyncStorage.getItem('rideCount');
      const user_contact = await AsyncStorage.getItem('userContact');
      const noOfSeat = await AsyncStorage.getItem('noOfSeat');
      const area = await AsyncStorage.getItem('area');
      const vehicleModel = await AsyncStorage.getItem('vehicleModel');
      const vehicleNum = await AsyncStorage.getItem('vehicleNum');
      const fare = await AsyncStorage.getItem('fare');

      setgotRideCounts(rides_count);
      setdriverName(user_name);
      setdriverUid(uid);
      setdriverContact(user_contact);
      setnoOfSeat(noOfSeat);
      setArea(area);
      setvehicleModel(vehicleModel);
      setvehicleNum(vehicleNum);
      setFare(fare);

      console.log(uid, user_name);
    } catch (error) {
      // Error retrieving data
      console.log('data nhe aya re = ', error);
    }
  };

  useEffect(() => {
    getRides();
  }, [driverUid]);

  const getRides = async () => {
    let today = new Date();
    let tempData = [];
    const data = await firestore()
      .collection('rides')
      .orderBy('publish_time', 'desc')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let tempObj = {
            num_of_seat: doc.data().num_of_seats,
            area: doc.data().area,
            driver_uid: doc.data().driver_uid,
            driver_name: doc.data().driver_name,
            capmus: doc.data().capmus,
            rideDate: doc.data().ride_date,
          };

          if (driverUid == tempObj.driver_uid) {
            {
              tempObj.rideDate == today.getDate()
                ? tempData.push(tempObj)
                : console.log('No rides ');
            }

            // console.log(tempObj)
          } else {
            console.log('No rides');
          }
        });
      })
      .catch(function (error) {
        console.log('Error = ', error);
      });
    // console.log('hehehe = ', tempData);
    setridesData(tempData);
  };

  const postRide = () => {
    console.log('-------------', ScheduleDate.toLocaleString());
    let today = new Date();
    firestore()
      .collection('rides')
      .add({
        num_of_seats: noOfSeat,
        schedule_day: ScheduleDate.toLocaleString(),
        fare: fare,
        area: area.toLowerCase(),
        driver_uid: driverUid,
        driver_name: driverName.toLowerCase(),
        publish_time: today,
        capmus: campus.toLowerCase(),
        vehicle_model: vehicleModel.toLowerCase(),
        vehicle_num: vehicleNum,
        ride_date: today.getDate(),
        user_contact: driverContact,
      })
      .then(() => {
        console.log('Ride posted succcessfully');
        storeRideData();

        // ToastAndroid.show('Ride posted succcessfully', ToastAndroid.SHORT);
        navigation.navigate('Driver map');
        // navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
    navigation.navigate('Driver map');
  };

  // const check = e => {
  //   const re = /^[0-9\b]+$/;
  //   if (e === '' || re.test(e)) {
  //     console.log('Hassan', e);
  //   }
  // };
  const storeRideData = async () => {
    try {
      await AsyncStorage.setItem('noOfSeat', noOfSeat);
      await AsyncStorage.setItem('area', area);
      await AsyncStorage.setItem('vehicleModel', vehicleModel);
      await AsyncStorage.setItem('vehicleNum', vehicleNum);
      await AsyncStorage.setItem('fare', fare);
    } catch (error) {
      // Error saving data
      console.log('Error saving data = ', error);
    }
  };

  const containsSpecialChars = str => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };

  const Validation = () => {
    console.log('Zabshare----------', ScheduleDate);

    const result = containsSpecialChars(area);
    const _seat = containsSpecialChars(noOfSeat);
    const _vechileModel = containsSpecialChars(vehicleModel);
    const _vehicleNum = containsSpecialChars(vehicleNum);
    // console.log('Zabshare', result)

    if (!noOfSeat.trim()) {
      // console.log('Enter Name')
      ToastAndroid.show('Enter Number of seats', ToastAndroid.SHORT);
    } else if (ScheduleDate == null) {
      // console.log('Enter Contact');
      ToastAndroid.show('Enter Schedule Day', ToastAndroid.SHORT);
    } else if (!area.trim()) {
      // console.log('Enter Email');
      ToastAndroid.show('Enter Area', ToastAndroid.SHORT);
    } else if (!vehicleModel.trim()) {
      ToastAndroid.show('Enter Vehicle Model', ToastAndroid.SHORT);
      // console.log('Enter Password');
    } else if (!vehicleNum.trim()) {
      ToastAndroid.show('Please Enter Vehicle Number', ToastAndroid.SHORT);
      // console.log('Please Select Value');
    } else if (fare == null) {
      // console.log('Enter Contact');
      ToastAndroid.show('Enter Fare', ToastAndroid.SHORT);
    } else if (fare > 1000) {
      // console.log('Enter Contact');
      ToastAndroid.show('Fare must be below 1000', ToastAndroid.SHORT);
    } else if (!campus.trim()) {
      ToastAndroid.show('Please Select Campus', ToastAndroid.SHORT);
      // console.log('Please Select Value');
    } else if (result == true) {
      ToastAndroid.show(
        'Remove Special Character from Area',
        ToastAndroid.SHORT,
      );
      // console.log('Please Select Value');
    } else if (_seat == true) {
      ToastAndroid.show(
        'Remove Special Character from Seats',
        ToastAndroid.SHORT,
      );
      // console.log('Please Select Value');
    } else if (_vechileModel == true) {
      ToastAndroid.show(
        'Remove Special Character from VechicleModel',
        ToastAndroid.SHORT,
      );
      // console.log('Please Select Value');
    } else if (_vehicleNum == true) {
      ToastAndroid.show(
        'Remove Special Character VechicleNumber',
        ToastAndroid.SHORT,
      );
      // console.log('Please Select Value');
    } else {
      retrieveLoginData();
      {
        ridesData.length >= 2
          ? ToastAndroid.show('You posted 2 rides before', ToastAndroid.SHORT)
          : postRide();
      }
      // console.log(designation,'asdadsdasdasdasds')
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
            Post ride
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
              Enter your ride details
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                value={noOfSeat}
                keyboardType="numeric"
                placeholder="Number Of Seats"
                maxLength={1}
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={text => setnoOfSeat(text)}
              />

              <DatePicker
                modal
                open={open}
                date={ScheduleDate}
                onConfirm={date => {
                  setOpen(false);
                  setScheduleDate(date);
                  // setTxt(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <TouchableOpacity
                onPress={() => setOpen(true)}
                // style={styles.buttonoutlinetext}
              >
                <Text style={styles.buttonoutlinetext}>
                  Select Date and time
                </Text>
              </TouchableOpacity>

              <TextInput
                value={area}
                keyboardType={'email-address'}
                placeholder="Zone/Area"
                maxLength={51}
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={text => setArea(text)}
              />

              <TextInput
                value={vehicleModel}
                keyboardType="default"
                placeholder="Vehicle Model"
                style={styles.input}
                maxLength={20}
                placeholderTextColor={'grey'}
                onChangeText={text => setvehicleModel(text)}
              />

              <TextInput
                value={vehicleNum}
                keyboardType="default"
                placeholder="Vehicle Num"
                maxLength={7}
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={text => setvehicleNum(text)}
              />

              <TextInput
                value={fare}
                keyboardType="numeric"
                placeholder="Enter Fare"
                style={styles.input}
                placeholderTextColor={'grey'}
                maxLength={4}
                onChangeText={text => setFare(text)}
              />
            </View>

            <SelectDropdown
              data={designationArray}
              buttonStyle={styles.dropdownContainerStyle}
              buttonTextStyle={styles.buttonText}
              rowTextStyle={styles.rowText}
              defaultButtonText="Select Campus"
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setcampus(selectedItem);
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
                <Text style={styles.buttonOutlineText}>Submit</Text>
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
