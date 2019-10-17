import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCgfrNbQKP24zEFJa6aztzKNLIy32RyBNA",
  authDomain: "bledatabase.firebaseapp.com",
  databaseURL: "https://bledatabase.firebaseio.com",
  projectId: "bledatabase",
  storageBucket: "",
  messagingSenderId: "16593585376",
  appId: "1:16593585376:web:6ad7e66e41ecf23ccbfc85",
  measurementId: "G-10Y7HEY3W2"
});

const db = firebaseApp.firestore()

export {db}
