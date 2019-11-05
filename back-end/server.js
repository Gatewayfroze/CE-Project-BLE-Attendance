const express = require('express')
const app = express()
const firebase = require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyCs9mOXsaWDrUsvv_sL9bk7cNju2cH6Tjk",
    authDomain: "test-6e0cf.firebaseapp.com",
    databaseURL: "https://test-6e0cf.firebaseio.com",
    projectId: "test-6e0cf",
    storageBucket: "test-6e0cf.appspot.com",
    messagingSenderId: "138194467648",
    appId: "1:138194467648:web:2013f8f2b1e8a95c2858a5",
    measurementId: "G-0DMPRYZWS5"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
app.get('/test', (req, res) => {
    db.collection("subject").add({
        name: "Los Angeles",
        detail:"testestestsetset"
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
})
app.get('/create',(req,res)=>{
    console.log('eieieie')
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});