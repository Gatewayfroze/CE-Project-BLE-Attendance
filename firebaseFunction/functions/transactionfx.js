const express = require("express");
const cors = require("cors")({ origin: true });
const app = express();
const fireConfig = require("./config");

app.use(cors);
const db = fireConfig.firestore();

app.post("/createTransaction", (req, res) => {
  db.collection("transactions")
    .add({
      timestamp: req.body.timestamp,
      schIndex: req.body.schIndex,
      status: req.body.status,
      studentUID: req.body.uid,
      subjectID: req.body.subjectID,
      uniqueID: req.body.uniqueID
    })
    .then(async () => {
      const map= {
        subjectID: req.body.subjectID,
        schIndex: req.body.schIndex,
        endTime: req.body.endTime
      }
      await db
        .collection("users")
        .doc(req.body.uid)
        .update({
          currentSubject: map
        })
        .then(() => {
          res.end();
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

app.post("/getTransactionSub", async (req, res) => {
  await db
    .collection("transactions")
    .where("subjectID", "==", req.body.subjectID)
    .get()
    .then(snapshot => {
      res.send(snapshot.docs.map(doc => doc.data()));

      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});

app.post("/getTransactionSubStu", async (req, res) => {
  await db
    .collection("transactions")
    .where("subjectID", "==", req.body.subjectID)
    .where("studentUID", "==", req.body.uid)
    .get()
    .then(snapshot => {
      res.send(snapshot.docs.map(doc => doc.data()));

      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});

module.exports = app;
