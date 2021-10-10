/** @format */

import React, { useEffect } from "react";
import { refreshAccessToken } from "../Apis/Spotify";

const User = () => {
  const handleLogOutClick = () => {
    localStorage.clear();
    console.log("cache cleared");
    window.location.reload();
  };
  return (
    <div className="user">
      <button onClick={handleLogOutClick}>logout</button>
    </div>
  );
};
export default User;
