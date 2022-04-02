import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { auth } from "./firebase";
import {
  getUserInfo,
  getUnlockedBuildingData,
} from "./services/getDataFromFirebase";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import ViroReactTestScreen from "./screens/ViroReactTestScreen";
import MiniGameOneScreen from "./screens/MiniGameOneScreen";
import MiniGameTwoScreen from "./screens/MiniGameTwoScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PathwayScreen from "./screens/PathwayScreen";
import ScoreBoard from "./screens/ScoreBoard";
import RankingScreen from "./screens/RankingScreen";
import SignOutScreen from "./screens/SignOutScreen";
import PathwayDetailsOneScreen from "./screens/Pathways/PathwayDetailsOneScreen";
import PathwayDetailsTwoScreen from "./screens/Pathways/PathwayDetailsTwoScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

var name = [];

var user = getUserInfo();
var title;

if (user) {
  getUnlockedBuildingData(user).then((snapshot) => {
    if (snapshot.exists()) {
      name = [];
      if (snapshot.val().name != undefined && snapshot.val().name.length > 0) {
        let title_string_array = snapshot.val().name.split(" ");
        title = title_string_array[0];
        console.log(title);
      } else {
        name = [];
      }
      // snapshot.val();
    } else {
      console.log("No data available");
    }
  });
}

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <View style={styles.userInfoSection}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                  marginBottom: 10,
                }}
              >
                <Text style={styles.username}>Username:</Text>
                <Text style={styles.title}>{title}</Text>
              </View>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
              labelStyle={{ color: "#84c9fb" }}
              label="Signout"
              onPress={() =>
                auth
                  .signOut()
                  .then(() => {
                    props.navigation.navigate("Login");
                  })
                  .catch((error) => alert(error.message))
              }
            />
          </DrawerContentScrollView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#363636",
          width: 200,
        },
        drawerActiveTintColor: "#ffffff",
        drawerInactiveTintColor: "#84c9fb",
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#dee2e6",
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Pathways" component={PathwayScreen} />
      <Drawer.Screen name="ScoreBoard" component={ScoreBoard} />
      <Drawer.Screen name="Rankings" component={RankingScreen} />
      <Drawer.Screen name="CS Pathway" component={PathwayDetailsOneScreen} />
      <Drawer.Screen
        name="General Pathway"
        component={PathwayDetailsTwoScreen}
      />
      {/* <Drawer.Screen name="Signout" component={SignOutScreen} /> */}
    </Drawer.Navigator>
  );
}

const navTheme = {
  colors: {
    background: "#121212",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#dee2e6",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Hallway Lookers"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ViroReactTest" component={ViroReactTestScreen} />
        <Stack.Screen name="MiniGameOne" component={MiniGameOneScreen} />
        <Stack.Screen name="MiniGameTwo" component={MiniGameTwoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerStyles: {
    backgroundColor: "black",
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#84c9fb",
  },
  username: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: "#ffffff",
  },
  userInfoSection: {
    paddingLeft: 20,
  },
});
