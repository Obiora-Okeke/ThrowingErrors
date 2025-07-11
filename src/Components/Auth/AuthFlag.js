// AuthFlag.js
//Trying to make a global flag so we don't run into errors
import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthFlag = createContext();

// Custom provider component
export const AuthFlagProvider = () => {
  const [flag, setFlag] = useState(false); // default value

  return (
    <AuthFlag.Provider value={{ flag, setFlag }}> </AuthFlag.Provider>
  );
};

// Custom hook for easy access
export const useAuthFlag = () => useContext(AuthFlag);
