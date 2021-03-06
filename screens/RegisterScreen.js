import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, database } from '../firebase';

const RegisterScreen = () => {
  const [registerForm, setRegisterForm] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      score: 300
    }
  )

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        auth.signOut()
          .then(() => {
            navigation.replace("Register");
            createTwoButtonAlert();
          })
          .catch(error => alert(error.message))
      }
    })

    return unsubscribe
  }, [])

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Account created successfully!",
      "Please login to continue.",
      [
        {
          text: "Cancel",
        },
        { text: "Login", onPress: () => navigation.replace("Login") }
      ]
    );

  const handleSignUp = () => {
    const isEmptyFields = Object.values(registerForm).some(val => val == "");
    if (isEmptyFields) {
      Alert.alert(
        "Registration Error",
        "All fields are Required",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ]
      );
      return;
    }
    const passwordMisMatch = registerForm.password !== registerForm.confirmPassword;
    if (passwordMisMatch) {
      Alert.alert(
        "Registration Error",
        "Password and confirm password do not match",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ]
      );
      return;
    }
    auth
      .createUserWithEmailAndPassword(registerForm.email, registerForm.password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Signed up with:', user.email);
        console.log("user : ", auth.currentUser.uid);
        console.log("firstName :", registerForm.firstName);
        console.log("lastName :", registerForm.lastName);
        console.log("email :", registerForm.email);
        database.ref('users/' + auth.currentUser.uid).set({
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
          email: registerForm.email,
          score: registerForm.score,
          unlocked_buildings: [],
          pathway1timer: {
            hotspot0: 0,
            hotspot1: 0,
            hotspot2: 0,
            pathwaystart: 0,
            pathwayend: 0,
            totaltime: 0
          }
        });
        setRegisterForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

      })
      .catch(error => {
        alert(error.message)
        console.log(error.message)
      })
  }

  const handleChange = (name, value) => {
    setRegisterForm({ ...registerForm, [name]: value });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={registerForm.firstName}
          onChangeText={value => handleChange('firstName', value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={registerForm.lastName}
          onChangeText={value => handleChange('lastName', value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={registerForm.email}
          onChangeText={value => handleChange('email', value)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={registerForm.password}
          onChangeText={value => handleChange('password', value)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm password"
          value={registerForm.confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    // marginBottom: 20
  },
  input: {
    borderColor: '#ca6702',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 3,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#941b0c',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#9B2226',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#9B2226',
    fontWeight: '700',
    fontSize: 16,
  },
})