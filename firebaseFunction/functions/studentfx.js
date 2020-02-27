const express = require("express");
const cors = require("cors")({ origin: true });
const app = express();
const fireConfig = require("./config")



app.use(cors);

const db = fireConfig.firestore();

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

app.post("/getStudent", (req, res) => {
  let email = req.body.studentID + "@kmitl.ac.th";
  db.collection("users")
    .where("email", "==", email)
    .get()
    .then(snapshot => {
          snapshot.forEach(doc=>{
            res.send(Object.assign({ uid: doc.id }, doc.data()));
          })
      

      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});

module.exports = app