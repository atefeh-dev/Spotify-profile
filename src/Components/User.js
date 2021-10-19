/** @format */

import React, { useEffect, useState } from "react";
import { getUserInfo, logout } from "../Apis/Spotify";
import { catchErrors } from "../utils";
import { IconUser, IconInfo } from "../Icons";
import Loader from "react-loader-spinner";

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
            <div
              className="diUserName"
              href={user.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer">
              <div className="Name">{user.display_name}</div>
            </div>
            <button className="LogoutButton" onClick={handleLogOutClick}>
              logout
            </button>
          </div>
        </div>
      ) : (
        <div className="box mx-auto">
          <Loader
            type="Audio"
            color="#404040"
            height={90}
            width={90}
            timeout={3000} //3 secs
          />
        </div>
      )}
    </React.Fragment>
  );
};
export default User;
