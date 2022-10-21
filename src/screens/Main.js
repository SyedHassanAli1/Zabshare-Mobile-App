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

export default class Main extends React.Component {
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
    }, 3000);
  }
  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{width: '70%', height: '70%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );

    return (
      <View style={styles.MainContainer}>
        <View style={styles.maincontainer}>
          <View>
            <Text style={styles.txtcont}>
              How to use ZabShare for the first time
            </Text>

            <Image
              style={styles.img2}
              source={require('../assets/images/app.jpg')}
            />

            <Text style={styles.txtcont1}>
              How to request a ride on the ZabShare app
            </Text>

            <Text style={styles.txtcont2}>
              If you’re a new ZabShare user taking a ride, don’t worry—it’s not
              complicated. Here’s the simple step-by-step on how to use ZabShare
              for the first time:
            </Text>

            <Text style={styles.txtcont2}>
              1. Open and log into the ZabShare app on your device.
            </Text>

            <Text style={styles.txtcont2}>
              2. Search your ride from into the “Available ride” section.
            </Text>

            <Text style={styles.txtcont2}>
              3. Select the type of vehicle you would like at the bottom of the
              screen.
            </Text>

            <Text style={styles.txtcont2}>
              4. Tap “request” and then confirm the pickup location.
            </Text>

            <Text style={styles.txtcont2}>
              5. Wait for your request to be accepted by a driver and check the
              estimated time of arrival.
            </Text>

            <Text style={styles.txtcont2}>
              6. Just wait for your driver to arrive. You can check their
              location on the in-app map and you will be notified when they are
              close to the pickup location.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Terms&Condition')
                }
                style={styles.buttonOutline}>
                <Text style={styles.buttonOutlineText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
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

  maincontainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  view: {
    justifyContent: 'center',
  },

  viewcont: {
    flex: 1,
  },

  txtcont: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
    fontWeight: '800',
    color: '#595958',
  },

  txtcont1: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
    fontWeight: '900',
    justifyContent: 'center',
    marginBottom: 1,
    lineHeight: 20,
    color: '#595958',
  },

  txtcont2: {
    fontSize: 12,
    textAlign: 'left',
    margin: 10,
    fontWeight: '600',
    justifyContent: 'center',
    marginBottom: 1,
    lineHeight: 20,
    color: '#595958',
  },

  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonOutline: {
    backgroundColor: '#fff',
    height: 50,
    width: 100,
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
    color: '#fff',
    fontWeight: '100',
    fontSize: 11,
  },

  buttonOutlineText: {
    color: '#0c54a3',
    fontWeight: '500',
    fontSize: 14,
  },

  img2: {
    width: 400,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
