const express = require("express");
const cors = require("cors")({ origin: true });
const app = express();
const fireConfig = require("./config")
const admin = require("firebase-admin");
app.use(cors);

const db = fireConfig.firestore();

app.post("/createSubject", (req, res) => {
  db.collection("subjects")
    .doc(req.body.subjectID)
    .set({
      subjectName: req.body.subjectName,
      schedule: req.body.schedule,
      students: [],
      teacher: req.body.teacherUID
    }).then(()=>{
      db
      .collection("users")
      .doc(req.body.teacherUID)
      .update({
        subject: admin.firestore.FieldValue.arrayUnion(req.body.subjectID)
      }).then(()=>{
        res.end()
        return
      }) .catch(error => {
        console.log(error, toString())
      })
      return
    }) .catch(error => {
      console.log(error, toString())
    })
  
})
app.get("/getAllSubject", (req, res) => {
  db.collection("subjects")
    .get()
    .then(snapshot => {
      res.send(snapshot.docs.map(doc => Object.assign({ subjectID: doc.id }, doc.data())))
      return
    })
    .catch(error => {
      console.log(error, toString())
    })
})

app.post("/getSubject", (req, res) => {
  db.collection("subjects")
    .doc(req.body.subjectID)
    .get()
    .then(snapshot => {
      res.send(snapshot.data())
      return
    })
    .catch(error => {
      console.log(error, toString())
    })
})

app.post("/getSubjectByID", (req, res) => {
  db.collection("users")
    .doc(req.body.uid)
    .get()
    .then(snapshot => {
      res.send(snapshot.data().subject)
      return
    })
    .catch(error => {
      console.log(error, toString())
    })
})

app.delete("/deleteSubject", async (req, res) => {
  await db.collection('users').where('subject', 'array-contains', req.body.subjectID).get().then(async snapshot => {
    snapshot.docs.map(doc => doc.id).forEach(async id => {

      await db.collection('users').doc(id).update({
        subject: admin.firestore.FieldValue.arrayRemove(req.body.subjectID)
      }).catch(error => {
        console.log(error, toString())
      })

    })
    
    return
  }).then(async() => {
   await db.collection("subjects").doc(req.body.subjectID).delete().catch(error => {
      console.log(error, toString())
    })

    await db.collection("transactions")
     .where("subjectID", "==", req.body.subjectID).get()
      .then(snapshot => {
       snapshot.docs.map(doc => doc.id).forEach(tran=>{
        db.collection("transactions").doc(tran).delete().catch(error => {
          console.log(error, toString());
        });
       })
    return
  }).catch(error => {
    console.log(error, toString())
  })
  res.end()
  return
})
})

Array.prototype.diff = function(arr2) {
  var ret = [];
  for(var i in this) {   
      if(arr2.indexOf(this[i]) > -1){
          ret.push(this[i]);
      }
  }
  return ret;
};

// app.post("/enroll", async (req, res) => {
//   students = req.body.studentsID
//   subject = req.body.subjectID

//   studentID = students.map(data => data + "@kmitl.ac.th")


//   //  db.collection("users")
//   // .where("role", "==", "student")
//   // .get()
//   // .then(snapshot => {
//   //   allstu = snapshot.docs.map(doc => doc.data().email)
//   //   students = allstu.diff(studentID).map(temp => temp.slice(0,8))
      
//   //   return;
//   // })
//   // .catch(error => {
//   //   console.log(error, toString());
//   // });

//   studentID.forEach(async data => {
//     await db
//       .collection("users")
//       .where("email", "==", data)
//       .get()
//       .then(async snapshot => {
//         await snapshot.forEach(async docs => {
//           await db
//             .collection("users")
//             .doc(docs.id)
//             .update({
//               subject: admin.firestore.FieldValue.arrayUnion(req.body.subjectID)
//             })
//             .then(() => {
//               students.forEach(async (doc) => {
//                 await db
//                   .collection("subjects")
//                   .doc(req.body.subjectID)
//                   .update({
//                     students: admin.firestore.FieldValue.arrayUnion(doc)
//                   })
//                   .catch(error => {
//                     console.log(error, toString())
//                   })
//               })
//               return
//             })
//         })
//         res.end()
//         return

//       })
//       .catch(error => {
//         console.log(error, toString())
//       })
//   })
// })


 

app.post('/enroll',(req,res)=>{ 
  studentsOld = req.body.studentsID

  studentIDOld = studentsOld .map(data => data + "@kmitl.ac.th")

  db.collection("users")
  .where("role", "==", "student")
  .get()
  .then(snapshot => {
    allstu = snapshot.docs.map(doc => doc.data().email)
    students = allstu.diff(studentIDOld).map(temp => temp.slice(0,8))
    studentID = students.map(data => data + "@kmitl.ac.th") 

    difference = studentsOld.filter(x => !students.includes(x));
    if(students.length === 0){
      res.send(400, { error: "Unlisted student" });
    }else if(students.length < studentsOld.length){
      res.send(400, { error: difference });
    }
    
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
              .then(() => {
                students.forEach(async (doc) => {
                  await db
                    .collection("subjects")
                    .doc(req.body.subjectID)
                    .update({
                      students: admin.firestore.FieldValue.arrayUnion(doc)
                    })
                    .catch(error => {
                      console.log(error, toString())
                    })
                })
                return
              })
          })
          res.end()
          return
  
        })
        .catch(error => {
          console.log(error, toString())
        })
    })



    return;
  })
  .catch(error => {
    console.log(error, toString());
  });

  

  
  


})

app.post("/drop", async (req, res) => {
  student = req.body.studentID
  subject = req.body.subjectID

  studentID = student.map(data => data + "@kmitl.ac.th")

  await studentID.forEach(async data => {
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
              subject: admin.firestore.FieldValue.arrayRemove(req.body.subjectID)
            })
            .then(async () => {
              await student.forEach(async (doc) => {
                await db
                  .collection("subjects")
                  .doc(req.body.subjectID)
                  .update({
                    students: admin.firestore.FieldValue.arrayRemove(doc)
                  })
                  .catch(error => {
                    console.log(error, toString())
                  })
              })
              return
            })

           await db
          .collection("transactions")
           .where("subjectID", "==", req.body.subjectID)
           .where("studentUID", "==", docs.id)
           .get()
            .then(snapshot => {
             snapshot.docs.map(doc => doc.id).forEach(tran=>{
              db.collection("transactions").doc(tran).delete().catch(error => {
                console.log(error, toString());
              });
             })

      return;
    })
    .catch(error => {
      console.log(error, toString());
    });
        })
        res.end()
        return

      })
      .catch(error => {
        console.log(error, toString())
      })
  })
})

app.post('/updateSchedule',(req,res)=>{
  db.collection('subjects').doc(req.body.subjectID).update({
    schedule:req.body.newschedule
  }).then(()=>{
    res.end()
    return
  }).catch(error => {
    console.log(error, toString())
  })


})


module.exports = app