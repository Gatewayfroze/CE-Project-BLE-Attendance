const functions = require("firebase-functions");
var admin = require('firebase-admin');
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

admin.initializeApp(firebaseConfig)  
const db = admin.firestore()

app.post('/createSubject',(req,res)=>{  
  db.collection('subjects').doc(req.body.subjectID).set({
    subjectName : req.body.subjectName,
    schedule:req.body.schedule
  })  
  res.end()

})



exports.hello = functions.https.onRequest((req,res)=>{
  res.send('hello')
})

app.post('/getAllStudent',(req,res)=>{
  db.collection('users').where('role','==','student').get().then((snapshot)=>{
    res.send((snapshot.docs.map(doc =>doc.data() )))
    
    // res.end()
    return 
  }).catch(error=>{
    console.log(error, toString());
  })  

})

app.get('/getAllSubject',(req,res)=>{
  db.collection('subjects').get().then((snapshot)=>{
    res.send((snapshot.docs.map(doc =>doc.data() )))
    return
  }).catch(error=>{
    console.log(error, toString());
  })
})

app.post('/getSubject',(req,res)=>{
  db.collection('subjects').doc(req.body.subjectID).get().then((snapshot)=>{
    res.send(snapshot.data())
    return
  }).catch(error=>{
    console.log(error, toString());
  })
})

app.post('/getStudent',(req,res)=>{
  let email = req.body.studentID + '@kmitl.ac.th'
  db.collection('users').where('email','==',email).get().then((snapshot)=>{
    res.send((snapshot.docs.map(doc =>doc.data() )))
    // res.end()
    return
  }).catch(error =>{
    console.log(error,toString())
  })
})


app.post('/createAccount',async (req,res)=>{
  var _secretKey = "some-unique-key"; 
  var simpleCrypto = new SimpleCrypto(_secretKey); 
  var pass =  simpleCrypto.encrypt(req.body.email).slice(0,10)
    
  await admin.auth().createUser({
   
    email: req.body.email,
    password: pass
  }).then(async createdUser => {
        await db.collection('users').doc(createdUser.uid).set({
        email:req.body.email,
        name:req.body.name,
        surname:req.body.surname,
        role:req.body.role,
        faculty:req.body.faculty,
        year:req.body.year
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

app.delete('/deleteAccount', async(req,res)=>{
  await admin.auth().deleteUser(req.body.uid).then(async ()=>{
    await db.collection('users').doc(req.body.uid).delete()
     res.end()
     return   
  }).catch(error=>{
    console.log(error, toString());
  })
})

app.delete('/deleteSubject', async(req,res)=>{
 
    await db.collection('subjects').doc(req.body.subjectID).delete().catch(error=>{
      console.log(error, toString());
    })
     res.end()
     return   
  
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




 
