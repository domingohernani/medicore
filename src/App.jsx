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
import ViewImmunization from "./components/ViewImmunization";
import AddImmunization from "./components/AddImmunization";
import AddBMI from "./components/AddBMI";
import LogIn from "./pages/Login";
import AddMedicalHistory from "./components/AddMedicalHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <section className="fixed w-full">
                <NavBar />
              </section>
              <section className="fixed h-screen ml-4 w-fit top-20">
                <SideBar />
              </section>
              <section className="float-right my-20 mr-3 rounded-lg main-content ">
                <Routes>
                  <Route path="/login" element={<LogIn />} />

                  {/* Dashboard */}
                  <Route path="/" element={<DashBoard />} />

                  {/* List of children */}
                  <Route path="/listofchildren" element={<ListOfChildren />} />

                  {/* Bmi Tracking */}
                  <Route path="/bmitracking" element={<BMITracking />} />
                  <Route path="/addchildinfo" element={<AddBMITracking />} />
                  <Route
                    path="/viewbmitracking/:id"
                    element={<ViewBMITracking />}
                  />
                  <Route
                    path="/viewbmitracking/addbmi/:id"
                    element={<AddBMI />}
                  />
                  <Route
                    path="/viewbmitracking/addmedicalhistory/:id"
                    element={<AddMedicalHistory />}
                  />
                  {/* Immunization */}
                  <Route path="/immunization" element={<Immunization />} />
                  <Route
                    path="/viewimmunization/:id"
                    element={<ViewImmunization />}
                  />
                  <Route
                    path="/addimmunization"
                    element={<AddImmunization />}
                  />
                  {/* Reminders */}
                  <Route path="/reminders" element={<Reminders />} />
                </Routes>
              </section>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
