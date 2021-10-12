/** @format */

import React from "react";
import { windowAuthUri } from "../Apis/Spotify";

const LoginScreen = () => {
  const HandleLoginClick = () => {
    window.location = windowAuthUri;
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
