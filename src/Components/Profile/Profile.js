import React, { useEffect, useState } from "react";
import ProtectedRoute from "../../Common/ProtectedRoute.js";
import User from "./User.js";
import { checkUser } from "../Auth/AuthService";


const MainHome = () => {
  const [flag, setFlag] = useState(false);


  useEffect(() => {
    if (checkUser()) {
      console.log("authorized!");
      setFlag(true);
    } else {
      console.log("unauthorized!");
      setFlag(false);
    }
  }, []);

  return (
    <div>
      <ProtectedRoute exact path="/user" flag={flag} element={User} />
    </div>
  );
};

export default MainHome;
