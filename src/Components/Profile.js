/** @format */

import React from "react";
import Nav from "../Components/Nav";
import { Router } from "@reach/router";
import User from "./User";

const Profile = () => {
  return (
    <div>
      <Nav />
      <Router>
        <User path="/" />
      </Router>
    </div>
  );
};
export default Profile;
