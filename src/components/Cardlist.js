import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {Card} from 'react-native-shadow-cards';
import {Footer, Left, Right} from 'native-base';

const Cardlist = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Card style={{padding: 10, margin: 4}}>
        <Text>Name: Syed Hassan Ali</Text>
        <Text>Phone No: 03328285207</Text>
        <Text>Vechicle No: gh-2729</Text>
        <Text>No. of Seats: 3</Text>
        <Text>Ride Schedule: Monday/3pm</Text>
        <Text>Area: Nazimabad</Text>
        <Text>Fares: 200-300PKR</Text>
      </Card>
    </View>
  );
};

export default Cardlist;

const styles = StyleSheet.create({
  button1: {
    backgroundColor: '#0c54a3',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    margin: 10,
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
  button2: {
    backgroundColor: '#0c54a3',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    margin: 10,
    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  txt: {color: 'red'},
});
