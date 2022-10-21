import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Mylocation = () => {
  const [info, setInfo] = useState(0);
  Geolocation.getCurrentPosition(data => {
    setInfo(data.coords.latitude);
  });
  console.warn('Geolocation');
  return (
    <View>
      <Text style={{fontSize: 70}}>latitude longitude, {info}</Text>
    </View>
  );
};

export default Mylocation;

const styles = StyleSheet.create({});
