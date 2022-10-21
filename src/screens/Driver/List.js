import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Content, Footer, Header, Right} from 'native-base';
import DriverComponent from '../../components/DriverComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-shadow-cards';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function List({navigation}) {
  const [ridesData, setridesData] = useState([]);
  const [driverUid, setdriverUid] = useState('');
  const [driverName, setdriverName] = useState('');

  useEffect(() => {
    retrieveLoginData();
  }, []);

  const retrieveLoginData = async () => {
    console.log('Async function chala k nhe');
    try {
      const uid = await AsyncStorage.getItem('userId');
      const user_name = await AsyncStorage.getItem('userName');
      setdriverName(user_name);
      setdriverUid(uid);
      console.log(uid, user_name);
    } catch (error) {
      // Error retrieving data
      console.log('data nhe aya re = ', error);
    }
  };

  useEffect(() => {
    getRides();
  }, [driverUid]);

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
            capmus: doc.data().capmus,
            vehicle_model: doc.data().vehicle_model,
            vehicle_num: doc.data().vehicle_num,
          };

          if (driverUid == tempObj.driver_uid) {
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
    setridesData(tempData);
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
            Posted rides
          </Text>
        </View>
      </Header>

      <View style={styles.bodyContainer}>
        {ridesData.map((val, index) => {
          return (
            // <Content>
            <Card style={{padding: 10, margin: 10}} key={index}>
              <Text style={styles.txt}>Name: {val.driver_name}</Text>
              {/* <Text style={styles.txt}>Vechicle Details: Toyota-Cultus/G2729</Text> */}
              <Text style={styles.txt}>Available Seats: {val.num_of_seat}</Text>
              {/* <Text style={styles.txt}>Schedule Time: {val.scheduleTime}</Text> */}
              <Text style={styles.txt}>Schedule Date: {val.schedule_day}</Text>
              <Text style={styles.txt}>Area/Zone: {val.area}</Text>
             
              <Text style={styles.txt}>
                Vehicle Detail: {val.vehicle_model}/{val.vehicle_num}  
              </Text>
              <Text style={styles.txt}>Fare: {val.fare}</Text>
            </Card>
            // </Content>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },

  buttonOutline: {
    backgroundColor: 'white',
    height: 50,
    width: 600,
    padding: 15,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },

  buttonOutlineText: {
    color: '#0c54a3',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },

  txt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#595958',
    alignItems: 'center',
    fontFamily: 'sans-serif-medium',
    padding: 2,
  },

  bodyContainer: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    // backgroundColor:'yellow'
  },
});
