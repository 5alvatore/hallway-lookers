import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import { Dimensions } from "react-native";

import {Feather} from  '@expo/vector-icons';
import {
    ProfileScreen,
    PathwayScreen,
    RankingScreen,
    SignOutScreen 

} from "./screens";
 const Drawer = createDrawerNavigator()

 export default function App() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Pathways" component={PathwayScreen} />
          <Drawer.Screen name="Rankings" component={RankingScreen} />
          <Drawer.Screen name="Signout" component={SignOutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
