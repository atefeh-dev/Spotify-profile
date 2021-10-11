/** @format */

import React, { useState, useEffect } from "react";
import Profile from "../Components/Profile";
import LoginScreen from "../Components/LoginScreen";
import { getAccessToken, token, getInitialAccessToken } from "../Apis/Spotify";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    getInitialAccessToken().then((token) => setAccessToken(token));
  }, []);
  console.log(accessToken);

  return (
    <div className="App">{accessToken ? <Profile /> : <LoginScreen />}</div>
  );
};
export default App;
