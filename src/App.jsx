import { useState } from "react";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import DashBoard from "./pages/Dashboard";
import ListOfChildren from "./pages/ListOfChildren";
import BMITracking from "./pages/BMITracking";
import Immunization from "./pages/Immunization";
import Reminders from "./pages/Reminders";
import AddBMITracking from "./components/AddBMITracking";
import ViewBMITracking from "./components/ViewBMITracking";

function App() {
  return (
    <>
      <BrowserRouter>
        <section className="fixed w-full">
          <NavBar></NavBar>
        </section>
        <section className="fixed h-screen ml-4 w-fit top-20">
          <SideBar></SideBar>
        </section>
        <section className="float-right my-20 mr-3 rounded-lg main-content ">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/listofchildren" element={<ListOfChildren />} />
            <Route path="/bmitracking" element={<BMITracking />} />
            <Route path="/immunization" element={<Immunization />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/addchildinfo" element={<AddBMITracking />} />
            <Route path="/viewbmitracking" element={<ViewBMITracking />} />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
