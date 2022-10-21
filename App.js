import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TermsCondition from './src/screens/TermsCondition';

import Driver from './src/navigation/Driver';
import Passenger from './src/navigation/Passenger';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {LogBox} from 'react-native';
import Main from './src/screens/Main';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import {View} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  const [isloggedIn, setisloggedIn] = useState(''); // 0 means go to login & 1 means go to home
  const [designation, setdesignation] = useState('');

  useEffect(() => {
    retrieveLoginData();
  }, []);

  const retrieveLoginData = async () => {
    console.log('Async function chala k nhe');
    try {
      const uid = await AsyncStorage.getItem('userId');
      const designation = await AsyncStorage.getItem('userDesignation');

      setisloggedIn(uid);
      setdesignation(designation);
      // navigation()
      // console.log('function chala = ', value);
      if (uid !== null) {
        setisloggedIn('1');
      } else {
        setisloggedIn('0');
      }
      // getlocation()
    } catch (error) {
      // Error retrieving data
      console.log('data nhe aya re = ', error);
    }
  };

  // useEffect(() => {
  //   navigation()
  // }, [])
  const Home = createNativeStackNavigator();
  const GotoHome = () => {
    return (
      <>
        {designation == '0' ? (
          <Home.Navigator>
            <Home.Screen
              name="Driver"
              component={Driver}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Passenger"
              component={Passenger}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Terms&Condition"
              component={TermsCondition}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
          </Home.Navigator>
        ) : (
          <Home.Navigator>
            <Home.Screen
              name="Passenger"
              component={Passenger}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Driver"
              component={Driver}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Terms&Condition"
              component={TermsCondition}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Home.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
          </Home.Navigator>
        )}
      </>
    );
  };

  const LoginNavigation = createNativeStackNavigator();
  const GotoLogin = () => {
    return (
      <LoginNavigation.Navigator initialRouteName="Main">
        <LoginNavigation.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />

        <LoginNavigation.Screen
          name="Terms&Condition"
          component={TermsCondition}
          options={{headerShown: false}}
        />

        <LoginNavigation.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <LoginNavigation.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />

        <LoginNavigation.Screen
          name="Driver"
          component={Driver}
          options={{headerShown: false}}
        />

        <LoginNavigation.Screen
          name="Passenger"
          component={Passenger}
          options={{headerShown: false}}
        />
      </LoginNavigation.Navigator>
    );
  };

  const Root = createNativeStackNavigator();

  const RootStack = () => {
    return (
      <Root.Navigator screenOptions={{headerShown: false}}>
        {isloggedIn == 1 ? (
          <Root.Screen name="GotoHome" component={GotoHome} />
        ) : (
          <Root.Screen name="GotoLogin" component={GotoLogin} />
        )}
      </Root.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
