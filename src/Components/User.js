/** @format */

import React from "react";
import { Redirect } from "react-router-dom";

const User = () => {
  const handleLogOutClick = () => {
    localStorage.clear();
    window.location.reload();
    <Redirect to="/login" />;
  };
  return (
    <div className="user">
      <button onClick={handleLogOutClick}>logout</button>
    </div>
  );
};
export default User;
