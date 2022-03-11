import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ViroReactTestScreen from './screens/ViroReactTestScreen';
import MiniGameOneScreen from './screens/MiniGameOneScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
// import {
//   ProfileScreen,
//   PathwayScreen,
//   RankingScreen,
//   SignOutScreen

// } from "./screens";

import ProfileScreen from './screens/ProfileScreen';
import PathwayScreen from './screens/PathwayScreen';
import RankingScreen from './screens/RankingScreen';
import SignOutScreen from './screens/SignOutScreen';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator()

function DrawerRoutes() {
  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        backgroundColor: '#363636',
        width: 200,
      },
      drawerActiveTintColor: "#ffffff",
      drawerInactiveTintColor: "#84c9fb",
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "#dee2e6"
    }}>
      <Drawer.Screen name="Home" component={HomeScreen}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Pathways" component={PathwayScreen} />
      <Drawer.Screen name="Rankings" component={RankingScreen} />
      <Drawer.Screen name="Signout" component={SignOutScreen} />
    </Drawer.Navigator>
  );
}

const navTheme = {
  colors: {
    background: '#121212',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Hallway Lookers"
        screenOptions={{
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#dee2e6"
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Hallway Lookers" component={DrawerRoutes} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} /> 
        <Stack.Screen name="ViroReactTest" component={ViroReactTestScreen} />
        <Stack.Screen name="MiniGameOne" component={MiniGameOneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerStyles: {
    backgroundColor: 'black',
  }
});
