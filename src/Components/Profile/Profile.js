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

  // In this case the flag is acquired through a check box, but it could also be received through another method
  // check the parse api docs for Parse.User() methods (authorized)

  return (
    <div>
      <ProtectedRoute exact path="/user" flag={flag} element={User} />
      {/* <Route path="" element={}/> */}
    </div>
  );
};

export default MainHome;
