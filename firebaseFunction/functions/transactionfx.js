const express = require("express");
const cors = require("cors")({ origin: true });
const app = express();
const fireConfig = require("./config");

app.use(cors);
const db = fireConfig.firestore();

app.post("/checkout", (req, res) => {
  db.collection("users")
    .doc(req.body.uid)
    .get()
    .then(snapshot => {
      current = snapshot.data().currentSubject;
      db.collection("transactions")
        .where("studentUID", "==", req.body.uid)
        .where("subjectID", "==", current.subjectID)
        .where("schIndex", "==", current.schIndex).get().then(snapshot=>{
          snapshot.docs.map(doc => doc.id).forEach(tran=>{
            db.collection("transactions").doc(tran).update({
              status:current.status
            }).then(()=>{
              db.collection('users').doc(req.body.uid).update({
                currentSubject:{}
              }).then(()=>{
                res.end()
                return
              }).catch(error => {
                console.log(error, toString());
              });
              
              return
            }).catch(error => {
              console.log(error, toString());
            });
           })
          return
          
        }).catch(error => {
      console.log(error, toString());
    });
      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
});

app.post("/createTransaction", (req, res) => {

  db.collection('transactions')
  .where("subjectID", "==", req.body.subjectID)  
  .where("schIndex", "==", req.body.schIndex)
  .get()
  .then(snapshot => {
    if(checkIfDuplicateExists(snapshot.docs.map(doc => doc.data().uniqueID)) === false ){
    db.collection("transactions")
    .add({
      timestamp: req.body.timestamp,
      schIndex: req.body.schIndex,
      status: "inclass",
      studentUID: req.body.uid,
      subjectID: req.body.subjectID,
      uniqueID: req.body.uniqueID,
      subjectName:req.body.subjectName
    })
    .then(async () => {
      
      const map= {
        subjectID: req.body.subjectID,
        schIndex: req.body.schIndex,
        endTime: req.body.endTime,
        subjectName:req.body.subjectName,
        mac:req.body.mac,
        status:req.body.status
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
  }
    else{
      res.status(500).send('Duplicate')
    }

    return;
  }).catch(error => {
    console.log(error, toString());
  });

  
});

app.post("/createTempTransaction", (req, res) => {
  db.collection("transactions")
    .add({
      timestamp: req.body.timestamp,
      schIndex: req.body.schIndex,
      status: req.body.status,
      studentUID: req.body.uid,
      subjectID: req.body.subjectID,
      uniqueID: req.body.uniqueID
    })
    .then( () => {
      res.end()
      return
      
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
      res.send(snapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data())));

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


app.post("/updateStatusTransaction",async (req,res)=>{
  await db.collection("transactions").doc(req.body.id).update({
    status:req.body.status
  }).then(()=>{
    res.end()
    return
  }).catch(error => {
    console.log(error, toString());
  });
})

function checkIfDuplicateExists(w){
  return new Set(w).size !== w.length 
}

app.post('/checkDuplicate',(req,res)=>{
  db.collection('transactions')
  .where("subjectID", "==", req.body.subjectID)  
  .where("schIndex", "==", req.body.schIndex)
  .get()
  .then(snapshot => {
    if(checkIfDuplicateExists(snapshot.docs.map(doc => doc.data().uniqueID)) === false ){
    res.end();}else{
      res.status(500).send('Duplicate')
    }

    return;
  }).catch(error => {
    console.log(error, toString());
  });
})

module.exports = app;
