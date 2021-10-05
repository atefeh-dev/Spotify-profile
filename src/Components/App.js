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
  const getReturnParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulator[key] = value;
      return accumulator;
    }, {});
    return paramsSplitUp;
  };
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      console.log({ access_token });
    }
  });
  console.log(localStorage.getItem("accessToken"));
  let accessToken = localStorage.getItem("accessToken");
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            {accessToken ? <Profile /> : <LoginScreen />}
          </Route>
          <Route path="/info">
            <Profile />
          </Route>
          <Route path="/callback">
            <Redirect to="info" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;

/* 


 <Router>
        <Switch>
          <Route path="/login" exact>
          </Route>
        </Switch>
      </Router>
 accessToken ? <Profile /> : <LoginScreen />;*/
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
                 {accessToken ? <Profile /> : <LoginScreen />}

  );
};*/
