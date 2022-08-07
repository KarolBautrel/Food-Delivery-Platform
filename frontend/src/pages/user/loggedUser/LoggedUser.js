import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
export const LoggedUser = () => {
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const [url, setUrl] = useState("/api/me");
  const { data, isLoading, isError } = useFetch("/api/me", authData.token);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  return <>{userData.name}</>;
};
