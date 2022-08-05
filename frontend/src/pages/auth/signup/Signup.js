import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const redirect = useNavigate();

  const [signUp, setSignUp] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const signUpForm = [
    { name: "name", placeholder: "Name", type: "name", id: "id" },
    {
      name: "username",

      placeholder: "Username",
      type: "username",
      id: "username",
    },
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
    {
      name: "re_password",

      placeholder: "Confirm Password",
      type: "password",
      id: "re_password",
    },
  ];

  const handleChange = (e) => {
    setSignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUp),
      });
      if (resp.ok) {
        redirect("/login");
      }

      throw new Error("Provided Credentials are wrong");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 style={{ marginLeft: "46%" }}>Register</h2>
      <form className="card">
        {signUpForm.map(({ name, id, placeholder, type }) => (
          <input
            className="register-form"
            name={name}
            placeholder={placeholder}
            value={signUpForm[name]}
            type={type}
            key={id}
            onChange={handleChange}
          />
        ))}
        <button
          style={{ width: "10%", marginLeft: "44%", marginTop: "15px" }}
          className="button"
          onClick={handleClick}
        >
          Sign up!
        </button>
      </form>
    </div>
  );
}

export default Signup;
