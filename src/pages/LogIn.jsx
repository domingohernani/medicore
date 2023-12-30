import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginIllustration from "../assets/loginassets/loginIllustration.svg";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAccessDenied, setShowAccessDenied] = useState(false);

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
      console.error("Authentication failed");
      setShowAccessDenied(true);
    }
  };

  return (
    <div className="absolute top-0 left-0 flex flex-col w-screen h-screen mx-auto bg-white">
      <div className="w-10/12 max-w-4xl mt-8 ml-9">
        <h6 className="font-bold logo">MediCore</h6>
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
        <div className="flex flex-col justify-center w-3/4 gap-5 px-12 py-10">
          <h3 className="mx-auto text-2xl text-center text-blue-800 loginHeader">
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
          {showAccessDenied ? (
            <span className="text-red-600">
              You've entered invalid username or password!{" "}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
