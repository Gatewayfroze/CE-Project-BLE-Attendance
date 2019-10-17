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
import EnrollPage from "./Pages/enrollPage"; 

function App() {
  return (
    <Router>
    {/*All our Routes goes here!*/}
    <Route exact path="/" component={MainPage} />
    <Route exact path="/enroll" component={EnrollPage} />

   </Router>
  );
}

export default App;
