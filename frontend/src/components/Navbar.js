import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/">Home</Link>

        <Link to="/profile">My profile</Link>
      </nav>
    </div>
  );
};
