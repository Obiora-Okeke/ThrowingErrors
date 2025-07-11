
import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkUser } from './Auth/AuthService.js';

const ProtectedRoute = ({ children }) => {
  return checkUser() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;