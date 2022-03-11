// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDWppM_av43eut1Nvo0uRYErRMQL3xsJg4",
  authDomain: "fir-auth-980e6.firebaseapp.com",
  projectId: "fir-auth-980e6",
  storageBucket: "fir-auth-980e6.appspot.com",
  messagingSenderId: "353077836705",
  appId: "1:353077836705:web:630d267040b4959b87a9e0"
};


// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
export {auth};