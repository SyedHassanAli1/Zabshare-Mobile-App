import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import {Footer, Right, Header} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

const gettingListData = obj => {
  console.log(obj, 'DriverData');
};

export default function DriverComponent({drivers}) {
  return (
    <View>
      {drivers.map((driver, index) => {
        return (
          <TouchableOpacity onPress={gettingListData(driver)}>
            <Card style={{padding: 20, margin: 10}}>
              <View key={index}>
                <Text style={styles.drivertext}>Name: {driver.name}</Text>
                <Text style={styles.drivertext}>
                  Vechile No: {driver.vechicleNo}
                </Text>
                <Text style={styles.drivertext}>
                  No.Of Seats: {driver.noOfSeat}
                </Text>
                <Text style={styles.drivertext}>
                  Ride Schedule: {driver.schedule}
                </Text>
                <Text style={styles.drivertext}>Area: {driver.area}</Text>
                <Text style={styles.drivertext}>
                  Fares: {driver.selectedValue}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  driversList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  drivertext: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 5,
    margin: 5,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
