import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkUser } from '../Components/Auth/AuthService.js';


const ProtectedRoute = ({ element: Component, flag, ...rest }) => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/login");
  };
  console.log("rest: ", rest);
  
  // hint: you can swp out the Navigate redirect for the Component
  // <Component />
  const check = checkUser();

  return (
    <div>
      {check ? (
        <Navigate to={rest.path} replace />
      ) : (
        <div>
          <p>Unauthorized! </p> <button onClick={goBackHandler}>Login.</button>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
