import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  console.log("NavBar was rendered");

  const navigate = useNavigate();

  useEffect(() => {
    const result = localStorage.getItem("isLoggedIn");

    if (result !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex flex-row items-center px-8 py-3 bg-white rounded-lg">
      <div className="w-1/6">MediCore</div>
      <div className="flex flex-row justify-end flex-1 gap-2">
        <div className="flex cursor-pointer items-center justify-center w-10 h-10 border-2 rounded-full border-C0076BE">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            fill="#0076BE"
            viewBox="0 0 448 512"
            className="w-5 h-5 text-C0076BE"
          >
            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
          </svg>
        </div>
        <div className="flex cursor-pointer items-center justify-center w-10 h-10 border-2 rounded-full border-C0076BE">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 text-C0076BE"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        <div
          className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-C0076BE"
          onClick={logOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}
