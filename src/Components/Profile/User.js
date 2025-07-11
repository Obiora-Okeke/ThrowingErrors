// User.js
import React, { useEffect, useState } from "react";
import Parse from "parse";
import { Link } from 'react-router-dom';
import { checkUser } from "../Auth/AuthService";
import { Navigate } from "react-router-dom";

const User = () => {
  const [userInfo, setUserInfo] = useState(null);

  const check = !checkUser();

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUserInfo({
        firstName: currentUser.get("firstName"),
        lastName: currentUser.get("lastName"),
        email: currentUser.get("email"),
        // password: currentUser.get("password"), // 🚨 DO NOT DO THIS in production
      });
    }
  }, []);

  return (
    <div>
      {check ? (
        <Navigate to={"/"} replace />
      ) : !userInfo ? (
        <p>Loading user info...</p>
      ) : (
        <div>
          <h2>User</h2>
          <p><strong>First Name:</strong> {userInfo.firstName}</p>
          <p><strong>Last Name:</strong> {userInfo.lastName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <br />
          <br />
          <Link to="/logout">Logout</Link >
        </div>
      )}

    </div>
  );
};

export default User;
