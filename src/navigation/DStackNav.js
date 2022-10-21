import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//driver screens
import Drivermap from '../screens/Driver/Drivermap';
import Driveronmap from '../screens/Driver/Driveronmap';
import Driveronway from '../screens/Driver/Driveronway';

import List from '../screens/Driver/List';
import AddDriver from '../screens/Driver/AddDriver';

import SignOut from '../screens/Driver/SignOut';

import DChecking from '../screens/Driver/DChecking';
import Driverconnect from '../screens/Driver/Driverconnect';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const MainStackNavigator = ({navigation, route}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="DChecking"
        component={DChecking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Add"
        component={AddDriver}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Driver map"
        component={Drivermap}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Driver onmap"
        component={Driveronmap}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="Driverconnect"
        component={Driverconnect}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="List"
        component={List}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignOut"
        component={SignOut}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Driver onway"
        component={Driveronway}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, ContactStackNavigator};
