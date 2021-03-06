/** @format */

import React, { useState, useEffect } from "react";
import Profile from "../Components/Profile";
import LoginScreen from "../Components/LoginScreen";
import {
  getAccessToken,
  getInitialAccessToken,
  getLocalAccessToken,
} from "../Apis/Spotify";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    getInitialAccessToken().then((token) => setAccessToken(token));
  }, []);
  const validated = getAccessToken();

  return (
    <div className="App">
      {accessToken || validated ? <Profile /> : <LoginScreen />}
    </div>
  );
};
export default App;
