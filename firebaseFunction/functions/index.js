const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const firebase = require("firebase")
const cors = require('cors')({origin: true});
const admin = require('firebase-admin')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyCgfrNbQKP24zEFJa6aztzKNLIy32RyBNA",
  authDomain: "bledatabase.firebaseapp.com",
  databaseURL: "https://bledatabase.firebaseio.com",
  projectId: "bledatabase",
  storageBucket: "bledatabase.appspot.com",
  messagingSenderId: "16593585376",
  appId: "1:16593585376:web:6ad7e66e41ecf23ccbfc85",
  measurementId: "G-10Y7HEY3W2"
};



app.use(cors);

exports.webApi = functions.https.onRequest(app);

firebase.initializeApp(firebaseConfig)  
const db = firebase.firestore()

app.post('/createSubject',(req,res)=>{
  
  db.collection('subjects').doc(req.body.sID).set({
    subjectName : req.body.sName
  })
  
  res.json({
    subjectName : req.body.sName
  });

})



exports.hello = functions.https.onRequest((req,res)=>{
  res.send('hello')
})

// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;


// const mailTransport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "panotsodsri@gmail.com",
//     pass: "emailpassword"
//   }
// });

// const key = "real secret keys should be long and random";
// const APP_NAME = "BLE Checker";
// exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
//   // [END onCreateTrigger]
//   // [START eventAttributes]
//   const email = user.email; // The email of the user.
//   // The display name of the user.

//   // [END eventAttributes]

//   return sendWelcomeEmail(email);
// });

// async function sendWelcomeEmail(email) {
//   const decrypted = 'kuy'+email+'kuy'
//   const mailOptions = {
//     from: `${APP_NAME} <noreply@firebase.com>`,
//     to: email
//   };
//   // The user subscribed to the newsletter.
//   mailOptions.subject = `Welcome to ${APP_NAME}!`;
//   mailOptions.text = `Welcome to ${APP_NAME}. Password : ${decrypted}.`;
//   await mailTransport.sendMail(mailOptions);
//   console.log("New welcome email sent to:", email);
//   return null;
// }




 
