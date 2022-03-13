import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, database } from '../firebase';

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Signed up with:', user.email);
        const reference = database.ref();
        console.log("user : ", auth.currentUser.uid);
        database.ref('users/' + auth.currentUser.uid).set({
            email: email,
            unlocked_buildings: ["Lambton_Tower_uow"]
          });

        // reference.child("users").get().then((snapshot) => {
        //   if (snapshot.exists()) {
        //     console.log(snapshot.val(), snapshot.val().length);

        //     database.ref('users/' + snapshot.val().length).set({
        //       email: email,
        //       unlocked_buildings: ["lambton_tower_uow"]
        //     });
        //   } else {
        //     console.log("No data available");
        //   }

        // }).catch((error) => {
        //   console.error(error);
        // });
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
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