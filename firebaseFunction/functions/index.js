const functions = require("firebase-functions");
var admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const firebase = require("firebase");
const cors = require("cors")({ origin: true });
var SimpleCrypto = require("simple-crypto-js").default;
const express = require("express");
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

admin.initializeApp(firebaseConfig);
const db = admin.firestore();

app.post('/getTransactionSub',async (req,res)=>{
  await db.collection('transactions').where('subjectID','==',req.body.subjectID).get().then((snapshot)=>{
    res.send(snapshot.docs.map(doc =>  doc.data()));

    return;
  }).catch(error => {
    console.log(error, toString());
  })
})

app.post('/getTransactionSubStu',async (req,res)=>{
  await db.collection('transactions').where('subjectID','==',req.body.subjectID).where("studentUID","==",req.body.uid).get().then((snapshot)=>{
    res.send(snapshot.docs.map(doc =>  doc.data()));

    return;
  }).catch(error => {
    console.log(error, toString());
  })
})

app.post("/createSubject", (req, res) => {
  db.collection("subjects")
    .doc(req.body.subjectID)
    .set({
      subjectName: req.body.subjectName,
      schedule: req.body.schedule,
      students: [],
      teacher:req.body.teacherUID
    });
  res.end();
});

exports.hello = functions.https.onRequest((req, res) => {
  res.send("hello");
});

app.post("/enroll", async (req, res) => {
  students = req.body.studentsID;
  subject = req.body.subjectID;

  studentID = students.map(data => data + "@kmitl.ac.th");

  studentID.forEach(async data => {
    await db
      .collection("users")
      .where("email", "==", data)
      .get()
      .then(async snapshot => {
        await snapshot.forEach(async docs => {
          await db
            .collection("users")
            .doc(docs.id)
            .update({
              subject: admin.firestore.FieldValue.arrayUnion(req.body.subjectID)
            })
            .then(() =>
              db
                .collection("subjects")
                .doc(req.body.subjectID)
                .update({
                  students: students
                })
                .then(() => {
                  res.end();
                  return;
                })
                .catch(error => {
                  console.log(error, toString());
                })
            );
        });

        return;
        
      })
      .catch(error => {
        console.log(error, toString());
      });
  });
});

app.get("/getAllStudent", (req, res) => {
  db.collection("users")
    .where("role", "==", "student")
    .get()
    .then(snapshot => {
      res.send(
        snapshot.docs.map(doc => Object.assign({ uid: doc.id }, doc.data()))
      );

      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});
app.get("/getAllTeacher", (req, res) => {
  db.collection("users")
    .where("role", "==", "teacher")
    .get()
    .then(snapshot => {
      res.send(
        snapshot.docs.map(doc => Object.assign({ uid: doc.id }, doc.data()))
      );

      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});


app.get("/getAllSubject", (req, res) => {
  db.collection("subjects")
    .get()
    .then(snapshot => {
      res.send(snapshot.docs.map(doc => Object.assign({ subjectID: doc.id }, doc.data())));
      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});

app.post("/getSubject", (req, res) => {
  db.collection("subjects")
    .doc(req.body.subjectID)
    .get()
    .then(snapshot => {
      res.send(snapshot.data());
      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});

app.post("/getSubjectByID", (req, res) => {
  db.collection("users")
    .doc(req.body.uid)
    .get()
    .then(snapshot => {
      res.send(snapshot.data().subject);
      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});

app.post("/getStudent", (req, res) => {
  let email = req.body.studentID + "@kmitl.ac.th";
  db.collection("users")
    .where("email", "==", email)
    .get()
    .then(snapshot => {
      res.send(snapshot.docs.map(doc => doc.data()));
     
      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});

app.post("/createAccount", async (req, res) => {
  var _secretKey = "some-unique-key";
  var simpleCrypto = new SimpleCrypto(_secretKey);
  var pass = simpleCrypto.encrypt(req.body.email).slice(0, 10);

  await admin
    .auth()
    .createUser({
      email: req.body.email,
      password: pass
    })
    .then(async createdUser => {
      if (req.body.role === "teacher") {
        year = "nan";
      } else {
        year = req.body.year;
      }

      await db
        .collection("users")
        .doc(createdUser.uid)
        .set({
          email: req.body.email,
          name: req.body.name,
          surname: req.body.surname,
          role: req.body.role,
          faculty: req.body.faculty,
          year: year,
          subject: []
        });
      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
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
  res.send(req.body);
});

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: "http://bledatabase.firebaseapp.com",
  // This must be true for email link sign-in.
  handleCodeInApp: true
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // // FDL custom domain.
  // dynamicLinkDomain: 'coolapp.page.link'
};

app.post("/changePassword", (req, res) => {
  db.collection("users")
    .doc(req.body.uid)
    .get()
    .then(snapshot => {
      admin
        .auth()
        .generatePasswordResetLink(snapshot.data().email, actionCodeSettings)
        .then(async link => {
          const mailOptions = {
            from: `${APP_NAME} <noreply@firebase.com>`,
            to: snapshot.data().email
          };
          // The user subscribed to the newsletter.
          mailOptions.subject = `New password for ${APP_NAME}!`;
          mailOptions.text = `Reset password link ${link}.`;
          await mailTransport.sendMail(mailOptions);
          console.log("New welcome email sent to:", snapshot.data().email);
          res.status(200).end();
          return;
        })
        .catch(error => {
          console.log(error, toString());
        });

      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});

app.delete("/deleteAccount", async (req, res) => {

  db.collection('users').doc(req.body.uid).get().then(async user=>{
    await user.data().subject.forEach(subject=>{
      db.collection('subjects').doc(subject).update({
        students:admin.firestore.FieldValue.arrayRemove(user.data().email.slice(0,8))
      }).catch(error => {
        console.log(error, toString());
      })
    })
    return
  }).then(async ()=>{
    await admin.auth().deleteUser(req.body.uid).then(async () => {
      await db.collection("users").doc(req.body.uid).delete();
      res.status(200).end();
      return;
    })
    .catch(error => {
      console.log(error, toString());
    })
    return
  }).catch(error => {
    console.log(error, toString());
  });
  
});

app.delete("/deleteSubject", async (req, res) => {
  await db.collection('users').where('subject','array-contains',req.body.subjectID).get().then( async snapshot=>{
    snapshot.docs.map(doc=>doc.id).forEach(async id=>{

     await  db.collection('users').doc(id).update({
        subject:admin.firestore.FieldValue.arrayRemove(req.body.subjectID)
      }).catch(error => {
        console.log(error, toString());
      })

    })
    //  res.end()
    return
  }).then(()=>{
   db.collection("subjects").doc(req.body.subjectID).delete().catch(error => {
      console.log(error, toString());
    });
    return
  }).catch(error => {
    console.log(error, toString());
  });
  res.end()
})

app.post("/createTransaction",(req,res)=>{
  db.collection('transactions').add({
    timestamp:req.body.timestamp,
    schIndex:req.body.schIndex,
    status:req.body.status,
    studentUID:req.body.uid,
    subjectID:req.body.subjectID,
    uniqueID:req.body.uniqueID
  }
  ).then(()=>{
    res.end()
    return
  }).catch(error => {
    console.log(error, toString());
  });


})

 
  


// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "attendacekmitl23@gmail.com",
    pass: "PANOTSODSRI1998"
  }
});

const key = "real secret keys should be long and random";
const APP_NAME = "BLE Checker";
