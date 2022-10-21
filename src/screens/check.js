import React from 'react';
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  View,
  Text,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CheckScreen extends React.Component {
  constructor() {
    super();
    this.state = {isVisible: true};
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };
  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 0);
  }

  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{width: '80%', height: '80%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );

    return (
      <View style={styles.MainContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{
            width: '40%',
            height: '40%',
            resizeMode: 'contain',
            margin: -80,
          }}
        />

        <Text
          style={{
            fontSize: 15,
            color: '#0c54a3',
            textAlign: 'center',
            fontWeight: '600',
            textDecorationLine: 'underline',
          }}>
          Choose your Account Type
        </Text>

        <TouchableOpacity
          style={styles.button1}
          disabled={false}
          onPress={() => this.props.navigation.navigate('Driver')}>
          <Icon name="drivers-license" size={60} color="#0c54a3" />
          <Text
            style={{
              fontSize: 14,
              color: '#0c54a3',
              fontWeight: '500',
              padding: 0,
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            Driver
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button1}
          disabled={false}
          onPress={() => this.props.navigation.navigate('Passenger')}>
          <MaterialCommunityIcons
            name="seat-passenger"
            size={60}
            color="#0c54a3"
          />
          <Text
            style={{
              fontSize: 14,
              color: '#0c54a3',
              fontWeight: '500',
              padding: 0,
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            Passenger
          </Text>
        </TouchableOpacity>

        {this.state.isVisible === true ? Splash_Screen : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },

  img: {
    height: 100,
    width: 170,
  },

  viewcont: {
    marginTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button1: {
    backgroundColor: '#fff',
    width: 100,
    height: 160,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    justifyContent: 'center',
  },
});
