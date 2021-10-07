/** @format */

import React, { useState, useEffect } from "react";
import Profile from "../Components/Profile";
import LoginScreen from "../Components/LoginScreen";
import ProtectedRoute from "../Components/ProtectedRoute";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticate] = useState(false);
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
      localStorage.setItem("auth", true);
      setIsAuthenticate(true);
      // console.log({ access_token });
    }
  });

  let auth = localStorage.getItem("auth");
  if (auth || isAuthenticated) {
    console.log(localStorage.getItem("accessToken"));
    return <Profile />;
  } else {
    console.log("no");
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">{auth ? <Profile /> : <LoginScreen />}</Route>
            <Route path="/info">{auth ? <Profile /> : <LoginScreen />}</Route>
            <Route path="*">
              <div style={{ color: "white" }}>404 not found</div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
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
