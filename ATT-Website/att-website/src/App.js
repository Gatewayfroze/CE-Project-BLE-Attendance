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

function App() {
  return (
    <Router>
    {/*All our Routes goes here!*/}
    <Route exact path="/" component={MainPage} />
    <Route exact path="/enroll" component={GenPage} />
   </Router>
  );
}

export default App;
