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

import {MainStackNavigator, ContactStackNavigator} from './PStackNav';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
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
        name="onmap"
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
