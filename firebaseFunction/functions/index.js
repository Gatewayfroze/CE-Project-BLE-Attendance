const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require('cors')({origin: true});

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;


const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "panotsodsri@gmail.com",
    pass: "emailpassword"
  }
});

const key = "real secret keys should be long and random";


const APP_NAME = "BLE Checker";

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  // The display name of the user.

  // [END eventAttributes]

  return sendWelcomeEmail(email);
});

async function sendWelcomeEmail(email) {
  const decrypted = 'kuy'+email+'kuy'
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Welcome to ${APP_NAME}. Password : ${decrypted}.`;
  await mailTransport.sendMail(mailOptions);
  console.log("New welcome email sent to:", email);
  return null;
}
