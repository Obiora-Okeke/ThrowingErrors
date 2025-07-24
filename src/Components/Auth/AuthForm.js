import React from "react";
import "./AuthForm.css";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={onChange}
          required
        />
      </div>
      {!isLogin && (
        <>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={user.firstName || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={user.lastName || ""}
              onChange={onChange}
              required
            />
          </div>
        </>
      )}
      <button type="submit" className="auth-button">
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
