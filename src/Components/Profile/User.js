// User.js
import React, { useEffect, useState } from "react";
import Parse from "parse";
import { Link } from 'react-router-dom';

const User = () => {
  const [userInfo, setUserInfo] = useState(null);
  // const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUserInfo({
        firstName: currentUser.get("firstName"),
        lastName: currentUser.get("lastName"),
        email: currentUser.get("email"),
      });
    }
  }, []);

  // const Review = Parse.Object.extend("Review");
  // const query = new Parse.Query(Review);
  // query.equalTo("author", Parse.User.current());
  // query.find().then((results) => {
  //   setUserReviews(results);
  // }).catch((error) => {
  //   console.error("Error fetching reviews:", error);
  // });



  if (!userInfo) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>User</h2>
      <p><strong>First Name:</strong> {userInfo.firstName}</p>
      <p><strong>Last Name:</strong> {userInfo.lastName}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <br />
      <br />
      <Link to="/logout">Logout</Link >
      <br />
      <br />
      {/* <h3>Your Reviews</h3>
      {userReviews.length > 0 ? (
        <ul>
          {userReviews.map((review) => (
            <li key={review.id}>
              <strong>Rating:</strong> {review.get("Rating")}<br />
              <strong>Feedback:</strong> {review.get("Feedback")}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )} */}
    </div>
  );
};

export default User;
