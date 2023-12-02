import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import dashboard from "../assets/sidebarassets/dashboard.svg";
import bmi from "../assets/sidebarassets/bmi.svg";
import immunization from "../assets/sidebarassets/immunization.svg";
import listofchildren from "../assets/sidebarassets/listofchildren.svg";
import reminders from "../assets/sidebarassets/reminders.svg";
import manageaccount from "../assets/sidebarassets/manageaccount.svg";

const isAdmin = () => {
  return localStorage.getItem("role") === "president" ? true : false;
};

export default function SideBar() {
  const location = useLocation();

  const sideBarLinkColor = ({ isActive }) => {
    return isActive
      ? " outline outline-2 outline-C0076BE rounded-lg bg-C0076BE/25"
      : "bg-CEDEDED rounded-lg";
  };

  const changeBgByUrl = ({ isActive }) => {
    const urlPattern =
      /^\/viewbmitracking(?:\/(?:addbmi|addmedicalhistory)\/\d+)?(?:\/\d+)?|\/addchildinfo$/;
    if (location.pathname.match(urlPattern) || isActive) {
      return "outline outline-2 outline-C0076BE rounded-lg bg-C0076BE/25";
    } else {
      return "bg-CEDEDED rounded-lg";
    }
  };

  return (
    <section className="flex flex-col h-full gap-5 px-5 py-5 bg-white rounded-lg ">
      <NavLink to={"/"} className={sideBarLinkColor}>
        <div className="flex items-center gap-2 px-3 py-3 rounded-lg ">
          <img src={dashboard} alt="" className="h-6 w-7" />
          <span className="font-medium">Dashboard</span>
        </div>
      </NavLink>
      <NavLink to={"/listofchildren"} className={sideBarLinkColor}>
        <div className="flex items-center gap-2 px-3 py-3 rounded-lg">
          <img src={listofchildren} alt="" className="w-6 h-6" />
          <span className="font-medium">List of children</span>
        </div>
      </NavLink>
      <NavLink to={"/bmitracking"} className={changeBgByUrl}>
        <div className="flex items-center gap-2 px-3 py-3 rounded-lg">
          <img src={bmi} alt="" className="w-6 h-6" />
          <span className="font-medium">BMI Tracking</span>
        </div>
      </NavLink>
      <NavLink to={"/immunization"} className={sideBarLinkColor}>
        <div className="flex items-center gap-2 px-3 py-3 rounded-lg">
          <img src={immunization} alt="" className="w-6 h-6" />
          <span className="font-medium">Immunization</span>
        </div>
      </NavLink>
      <NavLink to={"/reminders"} className={sideBarLinkColor}>
        <div className="flex items-center gap-2 px-3 py-3 rounded-lg">
          <img src={reminders} alt="" className="w-6 h-6" />
          <span className="font-medium">Reminders</span>
        </div>
      </NavLink>
      {isAdmin() ? (
        <NavLink to={"/manageaccounts"} className={sideBarLinkColor}>
          <div className="flex items-center gap-2 px-3 py-3 rounded-lg">
            <img src={manageaccount} alt="" className="w-6 h-6" />
            <span className="font-medium">Accounts</span>
          </div>
        </NavLink>
      ) : null}
    </section>
  );
}
