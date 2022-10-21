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
import React from 'react';
import Onmap from '../../components/DriverMap/Onmap';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Driveronmap = ({navigation}) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.Text}> Ride Successfully Posted!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('List')}
          style={styles.buttonOutline}>
          <Text
            style={{
              fontSize: 18,
              color: '#0c54a3',
              fontWeight: '400',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            Check Posted Rides
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Driveronmap;

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
});
