// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "auth-domain",
  projectId: "project-id",
  storageBucket: "storage-bucket",
  messagingSenderId: "1234567890",
  appId: "1:1234457836705:web:630d3223432"
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
export {auth};