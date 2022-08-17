import React from "react";
import Button from "react-bootstrap/Button";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Logout } from "../pages/auth/logout/Logout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LoggedUserMenu } from "../pages/user/loggedUser/LoggedUserMenu";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);

  return (
    <div>
      <nav
        className="z-0 relative"
        x-data="{open:false,menu:false, lokasi:false}"
      >
        <div
          class="relative  z-10 bg-gradient-to-tr bg-orange-400 to yellow-200 shadow"
          style={{ width: "100%" }}
        >
          <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
              <Link
                className="navbar-buttons"
                style={{
                  textDecoration: "none",
                }}
                to="/"
              >
                <h1 style={{ color: "gray" }}>Home</h1>
              </Link>
              {!name ? (
                <ul className="nav-list">
                  <li className="nav-list">
                    <Link className="navbar-buttons" to="/login">
                      <Button variant="outline-secondary">Login</Button>
                    </Link>
                  </li>
                  <li className="nav-list">
                    <Link className="navbar-buttons" to="/signup">
                      <Button variant="outline-secondary">Singup</Button>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="nav-list">
                  <li className="nav-list">
                    <LoggedUserMenu />
                  </li>
                  <li className="nav-list">
                    <Link
                      className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full"
                      to="/cart"
                    >
                      <AiOutlineShoppingCart />
                    </Link>
                  </li>
                  <li className="nav-list">
                    <Logout />
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
