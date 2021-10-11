/** @format */

import React, { useState, useEffect } from "react";
import Profile from "../Components/Profile";
import LoginScreen from "../Components/LoginScreen";
import { getAccessToken } from "../Apis/Spotify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    getAccessToken().then((token) => setAccessToken(token));
  }, []);

  return (
    <div className="App">{accessToken ? <Profile /> : <LoginScreen />}</div>
  );
};
export default App;
