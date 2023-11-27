import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginIllustration from "../assets/loginassets/loginIllustration.svg";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log("Login rendered");


  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8800/api/login", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", response.data.role.role);
        navigate("/");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-white left-0 top-0 absolute mx-auto">
      <div className="w-10/12 max-w-4xl mt-8 ml-9">
        <h6>MediCore</h6>
        <p className="welcomeText">Barangay Child Health Monitoring System</p>
      </div>
      <div className="flex w-3/4 m-auto bg-white logInContainer h-3/4 max-w-7xl">
        <div className="flex items-center justify-center w-full bg-opacity-30 bg-C2AA8F5">
          <img
            src={loginIllustration}
            alt=""
            width={"450px"}
            className="m-auto"
          />
        </div>
        <div className="flex flex-col w-3/4 px-12 py-10 justify-center gap-5">
          <h3 className="mx-auto text-center text-2xl text-blue-800 loginHeader">
            Please log in.
          </h3>
          <input
            type="text"
            placeholder="Username"
            className="px-3 py-2 border-2 border-blue-800 rounded-3xl"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 border-2 border-blue-800 rounded-3xl"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-2/5 py-1 mx-auto text-white bg-blue-700"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
