import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {Container, Content, Header} from 'native-base';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-shadow-cards';
import {CheckBox} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {scale} from 'react-native-size-matters';

export default function Driverconnect({navigation}) {
  const [ridesData, setridesData] = useState([]);
  const [driverUid, setdriverUid] = useState('');
  const [driverName, setdriverName] = useState('');

  useEffect(() => {
    retrieveLoginData();
  }, []);

  const retrieveLoginData = async () => {
    console.log('Async function chala k nhe');
    try {
      const uid = await AsyncStorage.getItem('userId');
      const user_name = await AsyncStorage.getItem('userName');
      setdriverName(user_name);
      setdriverUid(uid);
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
    let tempData = [];
    const data = await firestore()
      .collection('bookedRides')
      // .orderBy('publish_time', 'asc')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let tempObj = {
            uid: doc.id,
            schedule_day: doc.data().schedule_day,
            scheduleTime: doc.data().scheduleTime,
            area: doc.data().area,
            capmus: doc.data().capmus,
            passenger_contact: doc.data().passenger_contact,
            passenger_name: doc.data().passenger_name,
            passenger_uid: doc.data().passenger_uid,
            pickup_address: doc.data().pickup_address,
            ride_booking_date: doc.data().ride_booking_date,
            ride_status: doc.data().ride_status,
            driver_uid: doc.data().driver_uid,
          };

          if (driverUid == tempObj.driver_uid) {
            tempData.push(tempObj);
            // console.log(tempObj)
          } else {
            console.log('No rides');
          }
        });
      })
      .catch(function (error) {
        console.log('Error = ', error);
      });
    console.log('hehehe = ', tempData);
    setridesData(tempData);
  };

  const updateStatus = (status, uid) => {
    firestore()
      .collection('bookedRides')
      .doc(uid)
      .update({
        ride_status: status,
      })
      .then(() => {
        console.log('Data Updated!');
        ToastAndroid.show('Data Updated', ToastAndroid.SHORT);
        // navigation.navigate('Login');
      });
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
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
              Connected rides
            </Text>
          </View>
        </Header>
        <View style={styles.bodyContainer}>
          <ScrollView
            style={{
              height: '100%',
            }}>
            <View style={styles.bodyContainer2}>
              {ridesData
                // .filter(val => {
                //   if (searchQuery == '') {
                //     return val;
                //   } else if (
                //     val.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                //     val.schedule_day
                //       .toLowerCase()
                //       .includes(searchQuery.toLowerCase())
                //   ) {
                //     return val;
                //   }
                // })

                .map((val, index) => {
                  // console.log('campus name = ', val.campus)
                  return (
                    <>
                      {/* <Content> */}
                      <View style={styles.buttonOutline} key={index}>
                        <View
                          style={{
                            padding: 10,
                            height: scale(130),
                            width: '100%',
                            justifyContent: 'center',
                            //  backgroundColor:'red'
                          }}
                          key={index}>
                          <Text style={styles.txt}>
                            Name: {val.passenger_name}
                          </Text>
                          <Text style={styles.txt}>
                            Contact: {val.passenger_contact}
                          </Text>
                          <Text style={styles.txt}>
                            Pickup Address: {val.pickup_address}
                          </Text>
                          <Text style={styles.txt}>Campus: {val.capmus}</Text>
                          <Text style={styles.txt}>
                            Booking Date: {val.ride_booking_date}
                          </Text>
                          <Text style={styles.txt}>
                            Booking Status: {val.ride_status}
                          </Text>
                        </View>

                        <View
                          style={{
                            height: scale(50),
                            width: '100%',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            // marginTop:'5%',
                            flexDirection: 'row',
                            // backgroundColor:'yellow'
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              updateStatus('accepted', val.uid);
                            }}
                            style={styles.buttonOutline2}>
                            <Text style={{color: 'white'}}>Accept Ride</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              updateStatus('rejected', val.uid);
                            }}
                            style={styles.buttonOutline2}>
                            <Text style={{color: 'white'}}>Reject Ride</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {/* </Content> */}
                    </>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  buttonOutline: {
    backgroundColor: '#F8FBFF',
    height: scale(200),
    width: '90%',
    padding: '2%',
    margin: '2%',
    shadowColor: '#5499C7',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#0c54a3',
    borderWidth: 1,
  },

  buttonOutline2: {
    backgroundColor: '#0c54a3',
    height: scale(30),
    width: '40%',
    padding: '2%',
    margin: '2%',
    shadowColor: '#5499C7',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonOutlineText: {
    color: '#0c54a3',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },

  txt: {
    fontSize: scale(11),
    fontWeight: '600',
    color: '#595958',
    alignItems: 'center',
    fontFamily: 'sans-serif-medium',
    padding: 1,
  },

  bodyContainer: {
    // height: ,
    width: '100%',
    // alignItems: 'center',
    // backgroundColor:'yellow'
  },

  bodyContainer2: {
    // height: '100%',
    // height:scale(800),
    width: '100%',
    alignItems: 'center',
    paddingBottom: scale(100),
    // backgroundColor:'yellow'
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
    height: scale(40),
    width: '90%',
    borderWidth: 1,
    borderColor: '#0c54a3',
    // marginBottom:'5%'
  },
});
