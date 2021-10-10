/** @format */

import React, { useEffect, useState } from "react";
import { getUserInfo, logout } from "../Apis/Spotify";
import { catchErrors } from "../utils";

const User = () => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [TopTracks, setTopTracks] = useState(null);
  const handleLogOutClick = () => {
    logout();
  };
  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, playlists, topArtists, topTracks } =
        await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
      setTopArtists(topArtists);
      setTopTracks(topTracks);
    };
    catchErrors(fetchData());
  }, []);
  return (
    <div className="user">
      <button onClick={handleLogOutClick}>logout</button>
    </div>
  );
};
export default User;
