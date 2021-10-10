/** @format */

import React from "react";

const LoginScreen = () => {
  const CLIENT_ID = "28fd88bb75b9440c99b5949fccad86e5";
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URI_AFTER_LOGIN = "http://localhost:3000/callback";
  const SPACE_DELIMITER = "%20";
  const SCOPES = ["user-read-currently-playing", "user-modify-playback-state"];
  const SCOPE_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const HandleLoginClick = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPE_URL_PARAM}&response_type=code&show_dialog=true`;
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
/*
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
*/
