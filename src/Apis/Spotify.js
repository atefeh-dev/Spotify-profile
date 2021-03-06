/** @format */

import axios from "axios";
import qs from "qs";

// CONFIG

const CLIENT_ID = "28fd88bb75b9440c99b5949fccad86e5";
const CLIENT_SECRET = "29d0deb1ef0a4cb5a3ac4ba1d6a1bc9e";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI_AFTER_LOGIN = "http://localhost:3000/callback";
const EXPIRATION_TIME = 3600 * 1000; // 3600 secondes * 1000 = 1 hour in millisecond's
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-modify-playback-state",
  "user-follow-read",
  "playlist-read-private",
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "user-top-read",
  "user-follow-modify",
  "playlist-read-collaborative",
  " playlist-modify-public",
];
const SCOPE_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

//  url for Authenticate by Spotify called on login Screen

export const spotifyAuthUri = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPE_URL_PARAM}&response_type=code&show_dialog=true`;

// get and set from local storage

const setTokenTimestamp = () =>
  localStorage.setItem("spotify_token_timestamp", Date.now());

const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  localStorage.setItem("spotify_access_token", token);
};

const setLocalRefreshToken = (token) =>
  localStorage.setItem("spotify_refresh_token", token);
const getTokenTimestamp = () => localStorage.getItem("spotify_token_timestamp");
export const getLocalAccessToken = () =>
  localStorage.getItem("spotify_access_token");
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

// read response code from uri

const getReturnCodeFromAuth = () => {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }
  return code;
};

// Get access token off of query params (called on application init base code and Scope )

export const getInitialAccessToken = async () => {
  const data = {
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/callback",
    code: getReturnCodeFromAuth(),
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  try {
    const response = await axios.post(TOKEN_URL, qs.stringify(data));
    localStorage.clear();
    setLocalAccessToken(response.data.access_token);
    setLocalRefreshToken(response.data.refresh_token);
    setTokenTimestamp();
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

// check accessToken exist or need  to update

export const getAccessToken = () => {
  const localAccessToken = getLocalAccessToken();
  if (localAccessToken) {
    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
      console.log("Access token has expired, refreshing...");
      return refreshAccessToken();
    }
    return localAccessToken;
  }
};

//// API CALLS ***************************************************************************************

export const logout = () => {
  localStorage.clear();
  window.location.reload();
};

const getHeaders = async () => {
  const token = await getAccessToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */

export const getUser = async () =>
  axios.get("https://api.spotify.com/v1/me", { headers: await getHeaders() });

/**
 * Get User's Followed Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/
 */
export const getFollowing = async () =>
  axios.get("https://api.spotify.com/v1/me/following?type=artist", {
    headers: await getHeaders(),
  });

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */

export const getPlaylists = async () =>
  axios.get("https://api.spotify.com/v1/me/playlists", {
    headers: await getHeaders(),
  });

/**
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopArtistsLong = async () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
    { headers: await getHeaders() }
  );

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopTracksLong = async () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
    { headers: await getHeaders() }
  );

export const getUserInfo = () =>
  axios
    .all([
      getUser(),
      getFollowing(),
      getPlaylists(),
      getTopArtistsLong(),
      getTopTracksLong(),
    ])
    .then(
      axios.spread(
        (user, followedArtists, playlists, topArtists, topTracks) => ({
          user: user.data,
          followedArtists: followedArtists.data,
          playlists: playlists.data,
          topArtists: topArtists.data,
          topTracks: topTracks.data,
        })
      )
    );
