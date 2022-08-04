import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Logout } from "../pages/auth/logout/Logout";
export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);

  return (
    <div className="navbar">
      <nav>
        <Link to="/">Home</Link>
        {!name ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/profile">My profile</Link>
            <Logout />
          </>
        )}
      </nav>
    </div>
  );
};
