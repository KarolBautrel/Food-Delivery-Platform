import { Navigate } from "react-router-dom";

export const AuthChecker = ({ children }) => {
  const localStorageData = window.localStorage.getItem("AUTH_CREDENTIALS");
  const data = JSON.parse(localStorageData);
  console.log(data);
  if (!data) {
    return <Navigate to="/login" />;
  }
  return children;
};
