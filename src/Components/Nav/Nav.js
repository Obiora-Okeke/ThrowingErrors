import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav>
      <div className="nav-links">
        <Link 
          to="/" 
          className={isActiveLink('/') ? 'active' : ''}
        >
          Home
        </Link>
        <Link 
          to="/recipes" 
          className={isActiveLink('/recipes') ? 'active' : ''}
        >
          Recipes
        </Link>
        <Link 
          to="/popular" 
          className={isActiveLink('/popular') ? 'active' : ''}
        >
          Popular
        </Link>
        <Link 
          to="/login" 
          className={isActiveLink('/login') ? 'active' : ''}
        >
          Login
        </Link>
        <Link 
          to="/user" 
          className={isActiveLink('/user') ? 'active' : ''}
        >
          Profile
        </Link>
        <Link 
          to="/logout" 
          className={isActiveLink('/logout') ? 'active' : ''}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
