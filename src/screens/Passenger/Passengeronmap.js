import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {Container, Content, Header} from 'native-base';
import React, {useState, useEffect} from 'react';
import Onmap from '../../components/DriverMap/Onmap';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Geolocation from '@react-native-community/geolocation';
// import Geocoder from 'react-native-geocoding';

export default function Passengeronmap({navigation}) {
  // const [pickupAddress, setpickupAddress] = useState('');
  // const [lat, setlat] = useState(null);
  // const [lng, setlng] = useState(null);

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setlat(position.coords.latitude), setlng(position.coords.longitude);
  //     },

  //     error => this.setState({error: error.message}),
  //     {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
  //   );
  // }, []);

  // useEffect(() => {
  //  getAddress()
  // }, [lat])

  // const getAddress = () => {
  //   Geocoder.init('AIzaSyBW6BdbQdOxjogLRmNSfgS4dR3LIXCSQ6M');

  //   Geocoder.from(lat, lng)
  //     .then(json => {
  //       var addressComponent = json.results[0].address_components[0];
  //       console.log('Address found = ',addressComponent);
  //     })
  //     .catch(error => console.warn(error));
  // };

  return (
    <View style={styles.sectionContainer}>
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
            Passenger onmap
          </Text>
        </View>
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Passenger rides')}
          style={styles.buttonOutline}>
          <Text
            style={{
              fontSize: 18,
              color: '#0c54a3',
              fontWeight: '400',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            Connect Ride
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  sectionContainer: {
    flex: 1,
    backgroundColor: '#0c54a3',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    height: 60,
    borderRadius: 5,
    margin: 2,

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
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
    backgroundColor: '#fff',
    width: '50%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
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
    fontWeight: '700',
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
  },

  buttonText: {
    textAlign: 'left',
    width: '10%',
    color: 'grey',
    textTransform: 'capitalize',
  },

  Text: {
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
    alignItems: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
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
    height: '7%',
    width: '90%',
    marginBottom: '5%',
  },
});
