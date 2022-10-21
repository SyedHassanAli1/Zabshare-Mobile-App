import React, {useEffect, useState} from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-shadow-cards';
import {CheckBox} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Passengerconnect({navigation}) {
  const [passengerUid, setpassengerUid] = useState('');
  const [passengerName, setpassengerName] = useState('');
  const [passengerContact, setpassengerContact] = useState('');

  const [bookedRidesData, setbookedRidesData] = useState([]);

  useEffect(() => {
    retrieveLoginData();
  }, []);

  const retrieveLoginData = async () => {
    console.log('Async function chala k nhe');
    try {
      const uid = await AsyncStorage.getItem('userId');
      const user_name = await AsyncStorage.getItem('userName');
      const user_contact = await AsyncStorage.getItem('userContact');
      setpassengerName(user_name);
      setpassengerUid(uid);
      setpassengerContact(user_contact);
      // console.log(uid, user_name);
    } catch (error) {
      // Error retrieving data
      console.log('data nhe aya re = ', error);
    }
  };

  useEffect(() => {
    getBookedRides();
  }, [passengerUid]);

  const getBookedRides = async () => {
    let tempData = [];
    const data = await firestore()
      .collection('bookedRides')
      // .orderBy('publish_time', 'asc')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let tempObj = {
            ride_booking_date: doc.data().ride_booking_date,
            area: doc.data().area,
            fare: doc.data().fare,
            driver_uid: doc.data().driver_uid,
            passenger_uid: doc.data().passenger_uid,
            driver_contact: doc.data().driver_contact,
            driver_name: doc.data().driver_name,
            capmus: doc.data().capmus,
            vehicle_model: doc.data().vehicle_model,
            vehicle_num: doc.data().vehicle_num,
            ride_status: doc.data().ride_status,
          };

          if (passengerUid == tempObj.passenger_uid) {
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
    setbookedRidesData(tempData);
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
        <ScrollView
          style={{
            height: '100%',
          }}>
          <View style={{flex: 1}}>
            {bookedRidesData.map((res, index) => {
              return (
                <Card key={index} style={{padding: 12, margin: 12}}>
                  <Text style={styles.txt}>Name: {res.driver_name}</Text>
                  <Text style={styles.txt}>Contact: {res.driver_contact}</Text>
                  <Text style={styles.txt}>Area/Zone: {res.area}</Text>
                  <Text style={styles.txt}>Campus: {res.capmus}</Text>
                  <Text style={styles.txt}>
                    Vechicle Details: {res.vehicle_model}/{res.vehicle_num}
                  </Text>
                  <Text style={styles.txt}>Fare: {res.fare}</Text>
                  <Text style={styles.txt}>
                    Booking Date: {res.ride_booking_date}
                  </Text>
                  <Text style={styles.txt}>Status: {res.ride_status}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Feedback', {
                        id: res.driver_uid,
                        name: res.driver_name,
                      });
                    }}
                    style={styles.buttonOutline2}>
                    <Text style={{color: 'white'}}>Feedback</Text>
                  </TouchableOpacity>
                </Card>
              );
            })}
          </View>
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
  txt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#595958',
    alignItems: 'center',
    fontFamily: 'sans-serif-medium',
    padding: 2,
  },

  buttonOutline2: {
    backgroundColor: '#0c54a3',
    width: '100%',
    padding: '4%',
    shadowColor: 'grey',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
