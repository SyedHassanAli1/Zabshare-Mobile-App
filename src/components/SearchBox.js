import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

const SearchBox = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('100');
  const [info, setInfo] = useState(0);
  Geolocation.getCurrentPosition(data => {
    setInfo(data.coords.latitude);
  });
  console.warn('Geolocation');

  return (
    <View style={styles.container}>
      <View style={styles.sectionStyle}>
        <Image
          source={require('../assets/images/search.png')}
          style={styles.imageStyle1}
        />

        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 360}}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Szabist 79 Campus" value="79" />

          {/* 79 = 24.820633943760463, 67.02959643227946 */}

          <Picker.Item label="Szabist 99 Campus" value="99" />

          {/* 99 = 24.820044807006926, 67.03070418458826 */}

          <Picker.Item label="Szabist 100 Campus" value="100" />

          {/* 100 = 24.820345461851524, 67.03064651720518 */}

          <Picker.Item label="Szabist 153 Campus" value="153" />

          {/* 153 = 24.82052317650869, 67.03005106674537 */}

          <Picker.Item label="Szabist 154 Campus" value="154" />

          {/* 154 = 24.820271211125895, 67.03027503118058 */}
        </Picker>
      </View>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonOutline: {
    backgroundColor: 'white',
    height: 50,
    width: 600,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 1,

    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },

  buttonText: {
    color: 'white',
    fontWeight: '100',
    fontSize: 11,
  },

  buttonOutlineText: {
    color: '#0c54a3',
    fontWeight: '500',
    fontSize: 14,
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

  imageStyle1: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  imageStyle2: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
