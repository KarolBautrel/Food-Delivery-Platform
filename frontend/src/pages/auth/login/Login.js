import { useEffect, useState } from "react";
import { getLoggedUserData } from "../../../redux/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loginCredentials, setLoginCredentials] = useState([]);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: login.email, password: login.password }),
    });
    const data = await response.json();

    dispatch(
      getLoggedUserData({
        name: data.username,
        email: data.email,
        token: data.token,
      })
    );
    setLoginCredentials({ ...data });

    window.localStorage.setItem("AUTH_CREDENTIALS", JSON.stringify(data));
  };

  const loginForm = [
    {
      name: "email",
      placeholder: "Email",
      type: "email",
      id: "email",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      id: "password",
    },
  ];
  return (
    <div>
      <h1>Login </h1>
      <form onSubmit={handleSubmit}>
        {loginForm.map(({ name, placeholder, id, type }) => (
          <label key={id}>
            <input
              required
              id={id}
              key={id}
              type={type}
              placeholder={placeholder}
              name={name}
              value={loginForm[name]}
              onChange={handleChange}
            />
          </label>
        ))}
        <button className="button">Login</button>
      </form>
    </div>
  );
};
