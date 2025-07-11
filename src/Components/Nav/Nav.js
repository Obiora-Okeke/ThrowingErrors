import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="/recipes">Recipes</Link> | <Link to="/login">Login</Link > | <Link to="/profile">Profile</Link > | <Link to="/logout">Logout</Link>

  </nav>
);

export default Nav;
