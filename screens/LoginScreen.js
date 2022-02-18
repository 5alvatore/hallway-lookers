import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
//import * as React from 'react'
import { auth } from '../firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;

        console.log('Signed up with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding">
      <SafeAreaView style = {styles.container}>
        <Text style = {styles.gamename}>Hallway Lookers</Text>
        <TextInput style = {styles.input} placeholder = "Email" value={email}
          onChangeText={text => setEmail(text)}/>
        <TextInput style = {styles.password} placeholder = "Password" value={password}
        onChangeText={text => setPassword(text)} secureTextEntry />
        <View style = {styles.btnContainer}>
          <TouchableOpacity style = {styles.userButton} onPress = {handleLogin}>
            <Text style = {styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.userButton} onPress = {handleSignUp}>
            <Text style = {styles.btnText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.frgtBtnContainer}>
        <TouchableOpacity style = {styles.forgotPassBtn} onPress = {() => alert("This Works")}>
            <Text style = {styles.forgotPassText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    // </KeyboardAvoidingView>
  )
  }

export default LoginScreen

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


