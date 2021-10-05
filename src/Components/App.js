/** @format */

import React, { useState, useEffect } from "react";
import Profile from "../Components/Profile";
import LoginScreen from "../Components/LoginScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";

const App = () => {
  const token = localStorage.getItem("accessToken");
  console.log(token);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact>
            {token ? <Redirect to="/info" /> : <LoginScreen />}
          </Route>
          <ProtectedRoute
            isAuthenticated={token}
            path="/info"
            component={Profile}
          />
          <Route exact path="/">
            <Redirect exact from="*" to="info" />
          </Route>
          <Route path="*">
            <Redirect from="*" to="info" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;

/*  accessToken ? <Profile /> : <LoginScreen />;*/
/* return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <ProtectedRoute path="/info">
            <Profile />
          </ProtectedRoute>
          <Route exact path="/">
            <Redirect exact from="/" to="info" />
          </Route>
          <Route path="*">
            <Redirect from="/" to="info" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
           
  );
};*/
