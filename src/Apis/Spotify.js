/** @format */

import axios from "axios";
import qs from "qs";

// get token from redirect uri if we need 
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

 // CONFIG 

const CLIENT_ID = "28fd88bb75b9440c99b5949fccad86e5";
const CLIENT_SECRET = "29d0deb1ef0a4cb5a3ac4ba1d6a1bc9e";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

const EXPIRATION_TIME = 3600 * 1000; // 3600 secondes * 1000 = 1 hour in millisecond's
const setTokenTimestamp = () =>
  localStorage.setItem("spotify_token_timestamp", Date.now());

const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  localStorage.setItem("spotify_access_token", token);
};

const setLocalRefreshToken = (token) =>
  localStorage.setItem("spotify_refresh_token", token);
const getTokenTimestamp = () => localStorage.getItem("spotify_token_timestamp");
const getLocalAccessToken = () => localStorage.getItem("spotify_access_token");
const getLocalRefreshToken = () =>
  localStorage.getItem("spotify_refresh_token");

//Refresh the token

export const refreshAccessToken = async () => {
  try {
    const data = {
      grant_type: "refresh_token",
      refresh_token: getLocalRefreshToken(),
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };
    const response = await axios.post(TOKEN_URL, qs.stringify(data));
    setLocalAccessToken(response.data.access_token);
    console.log("refresh");
    return response.data.access_token;
  } catch (e) {
    console.error(e);
  }
};

const getReturnCodeFromAuth = () => {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }
  return code;
};

// Get access token off of query params (called on application init)

export const getAccessToken = async () => {
  const localAccessToken = getLocalAccessToken();
  if (localAccessToken) {
    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
      console.log("Access token has expired, refreshing...");
      return refreshAccessToken();
    }
    return localAccessToken;
  } else {
    const data = {
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/callback",
      code: getReturnCodeFromAuth(),
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    try {
      const response = await axios.post(TOKEN_URL, qs.stringify(data));
      console.log(response);
      localStorage.clear();
      setLocalAccessToken(response.data.access_token);
      setLocalRefreshToken(response.data.refresh_token);
      setTokenTimestamp();
      return await response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  }
};

export const token = getAccessToken();

//// API CALLS ***************************************************************************************
