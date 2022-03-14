import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'

const RegisterScreen = () => {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [registerForm, setRegisterForm] = useState(
    {
      firstName : "",
      lastName : "",
      email: "",
      password: "",
      confirmPassword : ""
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
    const isEmptyFields = Object.values(registerForm).some(val => val == "" );
    if(isEmptyFields) {
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
    if(passwordMisMatch) {
      Alert.alert(
        "Registration Error",
        "Passoword and confirm password do not match",
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
      .then(async(userCredentials) => {
        const user = userCredentials.user;
        await user.updateProfile({
          displayName: `${registerForm.firstName} ${registerForm.lastName}`
        })
        console.log('Signed up with:', user.email);
      })
      .catch(error => alert(error.message))
  }

   const handleChange = (name,value) => {
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
          onChangeText={value => handleChange('firstName',value)}
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
          onChangeText={value => handleChange('email',value)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={registerForm.password}
          onChangeText={value => handleChange('password',value)}
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
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#9B2226',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
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
    backgroundColor: '#9B2226',
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