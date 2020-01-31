import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import MainPage from "./Pages/index";
import GenPage from "./Pages/genPage";
import EnrollPage from "./Pages/enrollPage";
import ManageStd from "./Pages/viewStd";
import ManageSub from "./Pages/viewSub";
import LeavePage from "./Pages/leavePage";
import CreateSubPage from "./Pages/createSubPage";
import { AuthProvider } from "./auth";
import PrivateRoute from './privateRoute.js'

function App() {
  return (
    <AuthProvider>
      <Router>
        {/*All our Routes goes here!*/}
        <Route exact path="/" component={MainPage} />
        <PrivateRoute exact path="/enroll" component={EnrollPage} />        
        <PrivateRoute exact path="/generate" component={GenPage} />       
        <PrivateRoute exact path="/viewStd" component={ManageStd} />
        <PrivateRoute exact path="/viewSub" component={ManageSub} />
        <PrivateRoute exact path="/leave" component={LeavePage} />
        <PrivateRoute exact path="/createSub" component={CreateSubPage} />
      </Router>
    </AuthProvider>
  );
}

export default App;
