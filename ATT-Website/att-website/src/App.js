import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import MainPage from "./Pages/index";
import GenPage from "./Pages/genPage"; 
import EnrollPage from './Pages/enrollPage'
import ManageStd from './Pages/viewStd'
import ManageSub from './Pages/viewSub'
import LeavePage from './Pages/leavePage'
import CreateSubPage from './Pages/createSubPage'

function App() {
  return (
    <Router>
    {/*All our Routes goes here!*/}
    <Route exact path="/" component={MainPage} />
    <Route exact path="/generate" component={GenPage} />
    <Route exact path="/enroll" component={EnrollPage} />
    <Route exact path="/viewStd" component={ManageStd} />
    <Route exact path="/viewSub" component={ManageSub} />
    <Route exact path="/leave" component={LeavePage} />
    <Route exact path="/createSub" component={CreateSubPage} />
   </Router>
  );
}

export default App;
