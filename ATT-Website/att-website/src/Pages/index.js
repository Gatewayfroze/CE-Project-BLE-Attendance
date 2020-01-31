/*index.jsx*/
import React, { useCallback, useContext } from "react";
import "../Styles/styles.css";
import logo from "../logo.svg";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Container, FormGroup, Button, Input, Label } from "reactstrap";
import app from "../firebase.js";
import { AuthContext } from "../auth";
//Functional Component
const MainPage = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/enroll");
      } catch (error) {
        alert(error);
      }
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
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            marginLeft: 550,
            marginRight: 550,
            marginTop: 30,
            backgroundColor: "#e9f2e9",
            borderRadius: 10,
            padding: 10
          }}
        >
          <form onSubmit={handleLogin}>
            <label>
              Email
              <input name="email" type="email" placeholder="Email" />
            </label>
            <label>
              Password
              <input name="password" type="password" placeholder="Password" />
            </label>
            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MainPage);
