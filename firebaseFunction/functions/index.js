const functions = require("firebase-functions");
var admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
var SimpleCrypto = require("simple-crypto-js").default;
const express = require("express");
const app = express();
const student = require("./studentfx");
const subject = require("./subjectfx");
const transaction = require('./transactionfx')
const fireConfig = require("./config");
app.use(cors);
app.use("/", student);
app.use("/", subject);
app.use("/", transaction)

exports.webApi = functions.https.onRequest(app);

const db = fireConfig.firestore();
const APP_NAME = "BLE Checker";
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "attendacekmitl23@gmail.com",
    pass: "PANOTSODSRI1998"
  }
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
          subject: [],
          currentSubject:{}
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

  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Welcome to ${APP_NAME}. Password : ${pass}`;
  await mailTransport.sendMail(mailOptions);
  console.log("New welcome email sent to:", req.body.email);
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
  db.collection("users")
    .doc(req.body.uid)
    .get()
    .then(async user => {
      await user.data().subject.forEach(subject => {
        db.collection("subjects")
          .doc(subject)
          .update({
            students: admin.firestore.FieldValue.arrayRemove(
              user.data().email.slice(0, 8)
            )
          })
          .catch(error => {
            console.log(error, toString());
          });
      });
      return;
    })
    .then(async () => {
      await admin
        .auth()
        .deleteUser(req.body.uid)
        .then(async () => {
          await db
            .collection("users")
            .doc(req.body.uid)
            .delete();
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

app.post('/getUser',(req,res)=>{

  db.collection('users').where('email','==',req.body.email).get().then(snapshot=>{
    snapshot.forEach(doc=>{
      res.send(Object.assign({ uid: doc.id }, doc.data()));
    })
    return
  }).catch(error => {
    console.log(error, toString());
  });

})


