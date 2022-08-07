import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../../redux/auth";

export const Logout = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const handleClick = () => {
    try {
      fetch("/api/token/logout", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(clearUserData());
      window.localStorage.removeItem("AUTH_CREDENTIALS");
      console.log("success");
    } catch (error) {
      console.log(error);
    }
    redirect("/");
  };

  return (
    <div>
      <button className="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};
