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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MainStackNavigator, ContactStackNavigator} from './DStackNav';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          tabBarStyle: {display: 'none'},
          tabBarIcon: () => (
            <Image
              source={require('../assets/icons/home.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ride"
        component={ContactStackNavigator}
        options={{
          headerShown: false,
          tabBarStyle: {display: 'none'},
          tabBarIcon: () => (
            <Image
              source={require('../assets/icons/car.png')}
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
