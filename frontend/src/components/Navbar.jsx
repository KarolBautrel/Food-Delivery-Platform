import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Logout } from "../pages/auth/logout/Logout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LoggedUserMenu } from "../pages/user/loggedUser/LoggedUserMenu";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);

  return (
    <div className="navbar">
      <nav>
        <Link className="navbar-buttons" to="/">
          Home
        </Link>
        {!name ? (
          <>
            <Link className="navbar-buttons" to="/login">
              Login
            </Link>
            <Link className="navbar-buttons" to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <>
            <LoggedUserMenu />
            <Link className="navbar-buttons" to="/cart">
              <AiOutlineShoppingCart />
            </Link>
            <Logout />
          </>
        )}
      </nav>
    </div>
  );
};
