import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Container, Content, Header} from 'native-base';
import {Card} from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DChecking = ({navigation, route}) => {
  const navData = route.params;
  // console.log('navData = ', navData)
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
              Home
            </Text>
          </View>
        </Header>

        <Image
          style={styles.img2}
          source={require('../../assets/images/handmap.jpg')}
        />

        <View style={styles.containerr}>
          <TouchableOpacity onPress={() => navigation.navigate('Add')}>
            <Card style={{padding: 40, margin: 10}}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/ride.png')}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#0c54a3',
                  fontWeight: '500',
                  padding: 1,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                Post a ride
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('List')}>
            <Card style={{padding: 40, margin: 10}}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/car.png')}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#0c54a3',
                  fontWeight: '500',
                  padding: 1,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                Check posted rides
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Driverconnect')}>
            <Card style={{padding: 40, margin: 10}}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/profile.png')}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#0c54a3',
                  fontWeight: '500',
                  padding: 1,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                Connected rides
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DChecking;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
  },

  containerr: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    // backgroundColor:'grey'
  },

  txtcont: {
    fontSize: 14,
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

  img: {
    width: '100%',
    height: '40%',
    marginTop: '1%',
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
  icon: {
    width: 60,
    height: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  Text: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#0c54a3',
    alignItems: 'center',
    textDecorationLine: 'underline',
  },

  img2: {
    margin: 10,
    width: 380,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 6,
  },
});
