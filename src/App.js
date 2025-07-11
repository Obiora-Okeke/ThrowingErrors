import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import AuthRegister from "./Components/Auth/AuthRegister";
import AuthLogin from "./Components/Auth/AuthLogin";
import Logout from "./Components/Auth/AuthLogout";
import RecipeDetail from './Components/RecipeDetail/RecipeDetail';
import Profile from './Components/Profile/Profile';
import User from './Components/Profile/User';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Main />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;