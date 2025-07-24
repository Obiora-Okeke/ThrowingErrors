import React from 'react';
import { Navigate } from 'react-router-dom';
import Parse from '../parseConfig';

const ProtectedRoute = ({ children }) => {
  const currentUser = Parse.User.current();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
