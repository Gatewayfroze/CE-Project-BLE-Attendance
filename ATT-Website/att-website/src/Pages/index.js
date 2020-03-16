/*index.jsx*/
import React, { useCallback, useContext } from "react";
import "../Styles/styles.css";
import { withRouter, Redirect } from "react-router";
import app from "../firebase.js";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container } from '@material-ui/core'
import { AuthContext } from "../auth";
//Functional Component
const fire = app.firestore()
const MainPage = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      fire.collection("users").where('email', '==', email.value).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          // console.log(doc.data().role)
          if (doc.data().role === 'teacher') {
            try {
              app.auth().signInWithEmailAndPassword(email.value, password.value);
              history.push("/enroll");
            } catch (error) {
              alert(error);
            }
          } else {
            alert('Need permission')
            return <Redirect to='/' />
          }
        })
      })
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/enroll" />;
  }

  return (
    <div className="page-login">
      <h1 className="LogoApp" style={{ fontSize: 50, marginTop: 150 }}>
        ATTENDA
      </h1>
      <div >
        <Container maxWidth={'xs'}>

          <div
            style={{
              marginTop: 30,
              backgroundColor: "#e9f2e9",
              borderRadius: 10,
              padding: 10
            }}
          >
            <form onSubmit={handleLogin}>
              <div className='field'>
                <div className='field'>
                  <label className='label'>
                    Email
                </label>
                  <input className='input ' name="email" type="email" placeholder="Email" />
                </div>
                <div className='field'>
                  <label className='label'>
                    Password
                </label>
                  <input className='input' name="password" type="password" placeholder="Password" />
                </div>

                <div className='field is-grouped is-grouped-centered'>
                  <p className='control'>
                    <button className='button is-primary' type="submit">Log in</button>
                  </p>
               
                </div>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default withRouter(MainPage);
