const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const firebase = require("firebase")
const cors = require('cors')({origin: true});
var SimpleCrypto = require("simple-crypto-js").default;
const express = require('express');
// const bodyParser = require('body-parser');
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
// app.use(bodyParser)
exports.webApi = functions.https.onRequest(app);

firebase.initializeApp(firebaseConfig)  
const db = firebase.firestore()

app.post('/createSubject',(req,res)=>{  
  db.collection('subjects').doc(req.body.subjectID).set({
    subjectName : req.body.subjectName
  })  
  res.end()

})



exports.hello = functions.https.onRequest((req,res)=>{
  res.send('hello')
})



app.post('/createAccount',async (req,res)=>{
  var _secretKey = "some-unique-key";
 
  var simpleCrypto = new SimpleCrypto(_secretKey);
 
  var pass =  simpleCrypto.encrypt(req.body.email).slice(0,10)

    
  await firebase.auth().createUserWithEmailAndPassword(req.body.email, pass).then(async createdUser => {
        await db.collection('users').doc(createdUser.user.uid).set({
        email:req.body.email,
        name:req.body.name,
        surname:req.body.surname,
        role:req.body.role
      })
      return
    }).catch(error=>{
      console.log(error, toString());
    })  
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: req.body.email
    };
    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Welcome to ${APP_NAME}. Password : ${pass}.`;
    await mailTransport.sendMail(mailOptions);
    console.log("New welcome email sent to:", req.body.email);
    // return null;
  res.end()

})





const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;


const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "attendacekmitl23@gmail.com",
    pass: "PANOTSODSRI1998"
  }
});

const key = "real secret keys should be long and random";
const APP_NAME = "BLE Checker";
// exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
//   // [END onCreateTrigger]
//   // [START eventAttributes]
//   const email = user.email; // The email of the user.
//   // The display name of the user.

//   // [END eventAttributes]

//   return sendWelcomeEmail(email);
// });



// async function sendWelcomeEmail(email) {

//   const decrypted = email+'test'

 
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




 
