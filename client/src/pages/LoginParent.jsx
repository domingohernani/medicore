import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/medicore.png";
import ParentNavigation from "../components/ParentNavigation";
import loginImage from "../assets/loginassets/login-image.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const LoginParent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null); // State to store the install prompt event
  const navigate = useNavigate();
  const [isOpenPassword, setIsOpenPassword] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Store the event so it can be triggered later
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/getAllChildOfParent`,
        {
          params: { username, password },
        }
      );

      if (response.data.length > 0) {
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: `Welcome ${username}, you can now view your children's details.`,
          showConfirmButton: false,
          timer: 2000,
        });

        // Redirect to the page where the parent can see their children's details
        navigate("/immunization-viewing", {
          state: { children: response.data },
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        // Account blocked due to too many login attempts
        Swal.fire({
          icon: "error",
          title: "Account Blocked",
          text: "Your account has been blocked. Please reach out to your admin for further assistance.",
        });
        setUsername("");
        setPassword("");
      } else if (err.response && err.response.status === 401) {
        setUsername("");
        setPassword("");
        // Invalid username or password
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Invalid username or password. Please check your credentials. ",
        });
      } else if (err.response && err.response.status === 404) {
        // No children found
        Swal.fire({
          icon: "error",
          title: "No children found",
          text: "No children are associated with your account. Please contact support if you believe this is a mistake.",
        });
      } else {
        // Other errors (500 or network issues)
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      Swal.fire({
        title: "Install Vaxcare App",
        text: "Would you like to install the Vaxcare app for quick and easy access?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Install",
      }).then((result) => {
        if (result.isConfirmed) {
          deferredPrompt.prompt(); // Show the install prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              console.log("User accepted the install prompt");
            }
            setDeferredPrompt(null); // Clear the prompt once it's used
          });
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Install Unavailable",
        text: "The app is already installed or cannot be installed on this device.",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-primary">
      <div className="px-10 pt-4">
        <section className="flex items-center justify-between">
          <img src={logo} className="w-24 h-auto" />
          <div className="flex justify-center mt-4">
            {/* <button
              onClick={handleInstallClick}
              className="px-6 py-2 text-sm tracking-wide text-white bg-blue-600 rounded-lg shadow-xl hover:bg-blue-700 focus:outline-none"
            >
              Install App
            </button> */}
          </div>
        </section>
      </div>
      <div className="flex items-center justify-center px-4 py-20">
        <div className="grid items-center w-full max-w-3xl p-10 bg-white">
          {/* <div className="border bg-white z-10 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto"></div> */}
          <section className="">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-gray-800">
                  Parent Login
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  Welcome to the Barangay Child Health Monitoring System. Sign
                  in to access your account and view the vaccination status of
                  your children.
                </p>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-800">
                  Username
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                    placeholder="Enter username"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-800">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={`${isOpenPassword ? "text" : "password"}`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
                    placeholder="Enter password"
                  />

                  {isOpenPassword ? (
                    <EyeIcon
                      className="absolute w-5 h-5 right-4"
                      onClick={() => {
                        setIsOpenPassword(!isOpenPassword);
                      }}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="absolute w-5 h-5 right-4"
                      onClick={() => {
                        setIsOpenPassword(!isOpenPassword);
                      }}
                    />
                  )}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full px-4 py-3 text-sm tracking-wide text-white bg-blue-600 rounded-lg shadow-xl focus:outline-none"
                >
                  Log in
                </button>
              </div>
              <div className="m-4 ml-auto w-fit">
                <Link to={"/login"} className="text-black underline">
                  Login as President
                </Link>
              </div>
            </form>
          </section>
        </div>
        <div className="hidden w-full h-full md:block">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // src={loginImage}
            className="block object-cover w-full h-full mx-auto rounded-xl"
            alt="Child Health Monitoring"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginParent;
