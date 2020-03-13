import React from "react";
import "./App.css";
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './Components/ui/Theme'

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import MainPage from "./Pages/index";
import GenPage from "./Pages/genPage";
import BLEData from './Pages/BLEDataPage'
import EnrollPage from "./Pages/enrollPage";
import ManageStd from "./Pages/viewStd";
import ManageSub from "./Pages/viewSub";
import LeavePage from "./Pages/leavePage";
import CreateSubPage from "./Pages/createSubPage";
import SubjectDetailPage from './Pages/SubjectDetailPage'
import ScheduleTable from './Pages/ScheduleTable'


import { AuthProvider } from "./auth";
import PrivateRoute from './privateRoute.js'

function App() {
  return (
      <AuthProvider >
        <ThemeProvider theme={theme}>
          <Router>
            {/*All our Routes goes here!*/}
            <Route exact path="/" component={MainPage} />
            <PrivateRoute exact path="/enroll" component={EnrollPage} />
            <PrivateRoute exact path="/BLEdata" component={BLEData} />
            <PrivateRoute exact path="/generate" component={GenPage} />
            <PrivateRoute exact path="/viewStd" component={ManageStd} />
            <PrivateRoute exact path="/viewSub" component={ManageSub} />
            <PrivateRoute exact path="/viewSub/:subjectID" component={SubjectDetailPage} />
            <PrivateRoute exact path="/leave" component={LeavePage} />
            <PrivateRoute exact path="/createSub" component={CreateSubPage} />
            <PrivateRoute exact path="/export/:subjectID" component={ScheduleTable} />
          </Router>
        </ThemeProvider>
      </AuthProvider>
  );
}

export default App;
