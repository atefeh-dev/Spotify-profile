/** @format */

import React, { useEffect } from "react";
import Nav from "../Components/Nav";
import { Router } from "@reach/router";
import User from "../Components/User";
import RecentlyPlayed from "../Components/RecentlyPlayed";
import TopArtists from "../Components/TopArtists";
import TopTracks from "../Components/TopTracks";
import Playlists from "../Components/Playlists";
import Playlist from "../Components/Playlist";
import Recommendations from "../Components/Recommendations";
import Track from "../Components/Track";
import Artist from "../Components/Artist";
import ScrollToTop from "../Components/ScrollToTop";
import { useHistory } from "react-router-dom";
import { navigate } from "@reach/router";

const Profile = () => {
  useEffect(() => {
    navigate("/info");
  }, []);

  return (
    <div>
      <Nav />
      <Router primary={false}>
        <ScrollToTop path="/">
          <User path="/info" />
          <RecentlyPlayed path="recent" />
          <TopArtists path="artists" />
          <TopTracks path="tracks" />
          <Playlists path="playlists" />
          <Playlist path="playlists/:playlistId" />
          <Recommendations path="recommendations/:playlistId" />
          <Track path="track/:trackId" />
          <Artist path="artist/:artistId" />
        </ScrollToTop>
      </Router>{" "}
    </div>
  );
};
export default Profile;
