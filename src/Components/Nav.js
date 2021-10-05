/** @format */

import React from "react";
import "../Style/theme.css";
import { Link } from "@reach/router";

import {
  IconUser,
  IconGithub,
  IconExternal,
  IconSpotify,
  IconTime,
  IconMicrophone,
  IconPlaylist,
  IconMusic,
  IconInfo,
} from "../Icons";

const NavLink = (props) => <Link getProps={isActive} {...props} />;

const isActive = ({ isCurrent }) =>
  isCurrent ? { className: "active" } : null;

const Nav = () => {
  return (
    <div className="navContainer">
      <div className="Logo">
        <Link to="/info">
          <IconSpotify />
        </Link>
      </div>
      <ul className="Menu">
        <li>
          <NavLink to="/info">
            <IconUser />
            <div>Profile</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="artists">
            <IconMicrophone />
            <div>Top Artists</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="tracks">
            <IconMusic />
            <div>Top Tracks</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="recent">
            <IconTime />
            <div>Recent</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="playlists">
            <IconPlaylist />
            <div>Playlists</div>
          </NavLink>
        </li>
      </ul>
      <div className="Github">
        <Link to="/">
          <IconGithub />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
