import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import TabNavigator from './PTabNav';
import Passengerrides from '../screens/Passenger/Passengerrides';
import Driverrideslist from '../screens/Passenger/Rideslist';
import SignOut from '../screens/Passenger/SignOut';

import Profile from '../screens/Passenger/Profile';
import PChecking from '../screens/Passenger/PChecking';
import Feedback from '../screens/Passenger/Feedback';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: 'white',
          padding: 20,
        }}>
        <Text>ZabShare</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f7fcff',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Passenger Hand"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Home"
        component={PChecking}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Edit profile"
        component={Profile}
        options={{headerShown: false}}
      />
      {/* <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{headerShown: false}}
      /> */}
      <Drawer.Screen
        name="SignOut"
        component={SignOut}
        options={{headerShown: false}}
      />
      {/* <Drawer.Screen name="Available rides" component={Passengerrides} options={{headerShown: false}}/> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
