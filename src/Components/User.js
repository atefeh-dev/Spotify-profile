/** @format */

import React, { useEffect, useState } from "react";
import { getUserInfo, logout } from "../Apis/Spotify";
import { catchErrors } from "../utils";
import { IconUser, IconInfo } from "../Icons";

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
    <React.Fragment>
      {user ? (
        <div className="Main">
          <div className="Header">
            <div className="Avatar">
              {user.images.length > 0 ? (
                <img src={user.images[0].url} alt="avatar" />
              ) : (
                <div className="NoAvatar">
                  <IconUser />
                </div>
              )}
            </div>
            <button className="LogoutButton" onClick={handleLogOutClick}>
              logout
            </button>
          </div>
        </div>
      ) : (
        <div>loading ....</div>
      )}
    </React.Fragment>
  );
};
export default User;
