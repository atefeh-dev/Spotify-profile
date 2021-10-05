/** @format */

import React from "react";
import { useHistory } from "react-router-dom";

const User = () => {
  let history = useHistory();

  const handleLogOutClick = () => {
    localStorage.clear();
    console.log("cachcleared");
    window.location.reload();
  };
  return (
    <div className="user">
      <button onClick={handleLogOutClick}>logout</button>
    </div>
  );
};
export default User;
