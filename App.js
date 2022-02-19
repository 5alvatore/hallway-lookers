// import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {Font} from 'expo';
import { StyleSheet, Text, View, Button, SafeAreaView, ActivityIndicator, TextInput,TouchableOpacity } from 'react-native';

// type Props = {};
// export default class App extends Component<Props> {
export default class App extends Component {

  
  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <Text style = {styles.gamename}>Hallway Lookers</Text>
        <TextInput style = {styles.input} placeholder = "Username"/>
        <TextInput style = {styles.password} placeholder = "Password" secureTextEntry/>
        <View style = {styles.btnContainer}>
          <TouchableOpacity style = {styles.userButton} onPress = {() => alert("Login Works")}>
            <Text style = {styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.userButton} onPress = {() => alert("Signup Works")}>
            <Text style = {styles.btnText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.frgtBtnContainer}>
        <TouchableOpacity style = {styles.forgotPassBtn} onPress = {() => alert("This Works")}>
            <Text style = {styles.forgotPassText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC955',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gamename: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10
  },
  password: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  },
  userButton: {
    backgroundColor: "#47006D",
    padding: 15,
    width: "45%"
  },
  btnText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
  forgotPassBtn: {
    padding: 15
  }
});
