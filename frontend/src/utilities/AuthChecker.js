import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedUserData } from "../redux/auth";

export const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();
  const localStorageData = window.localStorage.getItem("AUTH_CREDENTIALS");
  const data = JSON.parse(localStorageData);
  if (!data) {
    return <Navigate to="/login" />;
  } else {
    dispatch(
      getLoggedUserData({
        name: data.username,
        email: data.email,
        token: data.token,
        id: data.id,
      })
    );
  }
  return children;
};
