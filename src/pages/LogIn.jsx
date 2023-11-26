import React from "react";
import loginIllustration from "../assets/loginassets/loginIllustration.svg";

export default function Login() {
  return (
    <div className="flex flex-col w-screen h-screen bg-white ">
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
        <div className="flex flex-col w-3/4 px-12 py-10 justify-evenly">
          <h3 className="mx-auto text-2xl text-blue-800 loginHeader">Log In</h3>
          <input
            type="text"
            placeholder="Email"
            className="px-3 py-2 border-2 border-blue-800 rounded-3xl"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 border-2 border-blue-800 rounded-3xl"
          />
          <button className="w-2/5 py-1 mx-auto text-white bg-blue-700">
            Log In
          </button>
          <div className="flex flex-row items-center gap-2">
            <hr className="bg-black grow" />
            <p className="font-semibold ">Log in as</p>
            <hr className="bg-black grow" />
          </div>
          <button className="w-1/3 py-1 mx-auto bg-white border border-blue-950 ">
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}
