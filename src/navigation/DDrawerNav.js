import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Left} from 'native-base';
import TabNavigator from './DTabNav';
import SignOut from '../screens/Driver/SignOut';
import DChecking from '../screens/Driver/DChecking';
import Profile from '../screens/Driver/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => (
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
        name="Driver Hand"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Home"
        component={DChecking}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Edit profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="SignOut"
        component={SignOut}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
