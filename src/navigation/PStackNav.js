import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//passenger screens
import Passengeronmap from '../screens/Passenger/Passengeronmap';
import Passengeronway from '../screens/Passenger/Passengeronway';

import PChecking from '../screens/Passenger/PChecking';
import Rideslist from '../screens/Passenger/Rideslist';
import Paassengerconnect from '../screens/Passenger/Passengerconnect';
import Feedback from '../screens/Passenger/Feedback';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="PChecking"
        component={PChecking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Passengerconnect"
        component={Paassengerconnect}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Passenger rides"
        component={Rideslist}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Passengeronmap"
        component={Passengeronmap}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Passengeronway"
        component={Passengeronway}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, ContactStackNavigator};
