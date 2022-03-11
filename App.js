import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ViroReactTestScreen from './screens/ViroReactTestScreen';
import InfoScreen from './screens/InfoScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import  MaterialCommunityIcons  from 
'react-native-vector-icons/MaterialCommunityIcons';
import HelpScreen from './screens/HelpScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const NavTab = () => {
  return (
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: '#9B2226' }} 
    activeColor="white" >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={30}/>
          ),
      }}
      />
       <Tab.Screen
        name="info"
        component={InfoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="information" color={color} size={30}/>
          ),
      }}
      />
      <Tab.Screen
        name="help"
        component={HelpScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="help" color={color} size={30}/>
          ),
      }}
      />
    </Tab.Navigator>

  )
      }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={NavTab}  options={{ headerShown: false }}/>
        <Stack.Screen name="ViroReactTest" component={ViroReactTestScreen} />
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
});