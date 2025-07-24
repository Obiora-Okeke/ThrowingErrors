import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';

// Components
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import AuthRegister from "./Components/Auth/AuthRegister";
import AuthLogin from "./Components/Auth/AuthLogin";
import Logout from "./Components/Auth/AuthLogout";
import RecipeDetail from './Components/RecipeDetail/RecipeDetail';
import Profile from './Components/Profile/Profile';
import User from './Components/Profile/User';
import Popular from './Components/Popular/Popular';
import ProtectedRoute from './Common/ProtectedRoute';
import SeedReviews from './Components/Admin/SeedReviews';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
            <Route path="/logout" element={<Logout />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipe/:id"
              element={
                <ProtectedRoute>
                  <RecipeDetail />
                </ProtectedRoute>
             }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/popular"
              element={
                <ProtectedRoute>
                  <Popular />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/seed-reviews"
              element={
                <ProtectedRoute>
                  <SeedReviews />
                </ProtectedRoute>
              }
            />

            {/* Optional catch-all redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="main-footer">
          <div className="footer-content">
            <p className="footer-text">
              © 2025 Recipe App. Made with React.
            </p>
            <div className="footer-links">
              <a href="/about" className="footer-link">About</a>
              <a href="/contact" className="footer-link">Contact</a>
              <a href="/help" className="footer-link">Help</a>
            </div>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
