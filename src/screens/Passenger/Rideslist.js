import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  LayoutAnimation,
} from 'react-native';
import {Content, Footer, Header, Right} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-shadow-cards';
import DriverComponent from '../../components/DriverComponent';
import {Searchbar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

export default function Rideslist({navigation}) {
  const [lat, setlat] = useState(null);
  const [lng, setlng] = useState(null);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [ridesData, setridesData] = useState([]);
  const [passengerUid, setpassengerUid] = useState('');
  const [passengerName, setpassengerName] = useState('');
  const [passengerContact, setpassengerContact] = useState('');
  const [pickupAddress, setpickupAddress] = useState('');
  const [bookData, setbookData] = useState({});
  const [address, setaddress] = useState('')
  const [position, setposition] = useState('')

  const refRBSheet = useRef();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setlat(position.coords.latitude), setlng(position.coords.longitude);
        setposition(position.coords)
      },

      error => console.log('location = ',error.message),
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );
  }, []);

  //location
  // useEffect(() => {
  //   getAddress();
  // }, [position]);

  // const getAddress = () => {
  //   let a = 24.821930093613275
  //   let b = 67.03489787614582

  //   fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + a + ',' + b + '&key=' + 'AIzaSyCT8SS2WF0GLer8WTSxsODRKNQMt9kyzko')
  //   // fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCT8SS2WF0GLer8WTSxsODRKNQMt9kyzko=' + a + ',' + b)
  //       // .then((response) => console.log('Address = ',response))
  //       .then((response) => response.json())

  //       .then((responseJson) => {
  //           console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.result));
  //       });

  //   console.log('cordinates', lat, lng  )
  //   Geocoder.init('AIzaSyCT8SS2WF0GLer8WTSxsODRKNQMt9kyzko');

  //   Geocoder.from({
  //     lat : a,
  //     lng : b
  //   })
  //     .then(json => {
  //       var addressComponent = json.results[0].address_components[0];
  //       console.log('Address found = ', addressComponent);
  //       setaddress(addressComponent)
  //     })
  //     .catch(error => console.warn('Erorr = ',error));
  // };

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
    getRides();
  }, []);

  const getRides = async () => {
    let tempData = [];
    const data = await firestore()
      .collection('rides')
      // .orderBy('publish_time', 'asc')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let tempObj = {
            num_of_seat: doc.data().num_of_seats,
            schedule_day: doc.data().schedule_day,
            fare: doc.data().fare,
            area: doc.data().area,
            driver_uid: doc.data().driver_uid,
            driver_name: doc.data().driver_name,
            capmus_name: doc.data().capmus,
            vehicle_model: doc.data().vehicle_model,
            vehicle_num: doc.data().vehicle_num,
            driver_contact: doc.data().user_contact,
          };
          tempData.push(tempObj);
        });
      })
      .catch(function (error) {
        console.log('Error = ', error);
      });
    // console.log('hehehe = ', tempData);
    setridesData(tempData);
  };

  const bookRide = () => {
    let value = bookData;
    console.log('heheheh = ', value);
    let today = new Date();
    firestore()
      .collection('bookedRides')
      .add({
        area: value.area.toLowerCase(),
        fare: value.fare,
        driver_uid: value.driver_uid,
        driver_name: value.driver_name.toLowerCase(),
        publish_time: today,
        capmus: value.capmus_name.toLowerCase(),
        ride_booking_date: today.toDateString().toLowerCase(),
        driver_contact: value.driver_contact,
        passenger_uid: passengerUid,
        passenger_name: passengerName.toLowerCase(),
        passenger_contact: passengerContact,
        ride_date: value.schedule_day,
        vehicle_num: value.vehicle_num,
        vehicle_model: value.vehicle_model,
        ride_status: 'pending',
        pickup_address: pickupAddress,
      })
      .then(() => {
        console.log('Ride posted succcessfully');
        ToastAndroid.show('Ride posted succcessfully', ToastAndroid.SHORT);
        // navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
    // navigation.navigate('Driver map');
  };

  return (
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
            Available rides
          </Text>
        </View>
      </Header>
      <Searchbar
        placeholder="Search"
        placeholderTextColor={'grey'}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={styles.bodyContainer}>
        <ScrollView
          style={{
            height: '100%',
          }}>
          <View style={styles.bodyContainer2}>
            {ridesData
              .filter(val => {
                if (searchQuery == '') {
                  return val;
                } else if (
                  val.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  val.schedule_day
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ) {
                  return val;
                }
              })

              .map((val, index) => {
                // console.log('campus name = ', val.campus)
                return (
                  <View key={index} style={styles.buttonOutline}>
                    {/* <Content> */}
                    <View>
                      <View
                        style={{
                          padding: 10,
                          height: scale(140),
                          width: '100%',
                          justifyContent: 'center',
                          //  backgroundColor:'red'
                        }}
                        key={index}>
                        <Text style={styles.txt}>Name: {val.driver_name}</Text>
                        <Text style={styles.txt}>
                          Contact: {val.driver_contact}
                        </Text>
                        <Text style={styles.txt}>
                          Available Seats: {val.num_of_seat}
                        </Text>
                        <Text style={styles.txt}>
                          Schedule Date: {val.schedule_day}
                        </Text>
                        {/* <Text style={styles.txt}>
                          Schedule Time: {val.scheduleTime}
                        </Text> */}

                        <Text style={styles.txt}>Area/Zone: {val.area}</Text>
                        <Text style={styles.txt}>
                          Campus: {val.capmus_name}
                        </Text>
                        <Text style={styles.txt}>
                          Vehicle Detail: {val.vehicle_model}/{val.vehicle_num}
                        </Text>
                        <Text style={styles.txt}>Fare: {val.fare}</Text>
                      </View>

                      <View
                        style={{
                          height: scale(50),
                          width: '100%',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          marginTop: '5%',
                          // backgroundColor:'yellow'
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            refRBSheet.current.open(), setbookData(val);
                          }}
                          style={styles.buttonOutline2}>
                          <Text style={{color: 'white'}}>Connect Ride</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* </Content> */}
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={250}
        //     openDuration={250}

        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F8FBFF',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <TextInput
          keyboardType="default"
          placeholder="Enter Pickup Address"
          style={styles.input}
          placeholderTextColor={'grey'}
          onChangeText={text => setpickupAddress(text)}
        />

        <TouchableOpacity
          onPress={() => {
            bookRide(), refRBSheet.current.close();
          }}
          style={styles.buttonOutline2}>
          <Text style={{color: 'white'}}>Connect Ride</Text>
        </TouchableOpacity>
      </RBSheet>

      {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Passenger onmap')}
          style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Continue your ride</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  buttonOutline: {
    backgroundColor: '#F8FBFF',
    height: scale(250),
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
    height: scale(40),
    width: '90%',
    padding: '2%',
    margin: '1%',
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