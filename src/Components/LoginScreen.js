/** @format */

import React from "react";
import { spotifyAuthUri } from "../Apis/Spotify";

const LoginScreen = () => {
  const HandleLoginClick = () => {
    window.location = spotifyAuthUri;
  };

  return (
    <div className="Login">
      <h1>Spotify Profile</h1>

      <a className="LoginButton" onClick={HandleLoginClick}>
        Log in to Spotify
      </a>
    </div>
  );
};
export default LoginScreen;
