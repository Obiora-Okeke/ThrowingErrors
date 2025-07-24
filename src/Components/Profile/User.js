// User.js
import React, { useEffect, useState } from "react";
import Parse from "parse";
import { Link } from 'react-router-dom';
import { checkUser } from "../Auth/AuthService";
import { Navigate } from "react-router-dom";

const User = () => {
  const [userInfo, setUserInfo] = useState(null);

  const check = !checkUser();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) return;

      const Favorite = Parse.Object.extend("Favorite");
      const query = new Parse.Query(Favorite);
      query.equalTo("user", currentUser);

      try {
        const results = await query.find();
        setFavorites(results.map(fav => fav.get("recipe")));
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };

    fetchFavorites();
  }, []);

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
          <hr />
          <div>
            <h3>My Favorite Recipes</h3>
            {favorites.length === 0 ? (
              <p>You have no favorite recipes yet.</p>
            ) : (
            <ul>
              {favorites.map((fav) => {
                console.log(fav.get('recipe'))
                console.log('huh')
                
                const recipe = fav.get('recipe');
                const recipeName = fav.get('recipeName');
                return (
                  <li key={recipe}>
                    <p> {recipe} </p>
                    <Link to={`${recipe}`}>{recipeName}</Link>
                  </li>
                );
              })}
            </ul>
            )}
          </div>
          <hr />
          <Link to="/logout">Logout</Link >
        </div>
      )}

    </div>
  );
};

export default User;
