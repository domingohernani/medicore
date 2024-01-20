import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import DashBoard from "./pages/Dashboard";
import ListOfChildren from "./pages/ListOfChildren";
import BMITracking from "./pages/BMITracking";
import Immunization from "./pages/Immunization";
import Reminders from "./pages/Reminders";
import AddChildInfo from "./components/AddChildInfo";
import ViewBMITracking from "./components/ViewBMITracking";
import ViewImmunization from "./components/ViewImmunization";
import AddImmunization from "./components/AddImmunization";
import AddBMI from "./components/AddBMI";
import LogIn from "./pages/LogIn";
import AddMedicalHistory from "./components/AddMedicalHistory";
import ManageAccounts from "./pages/ManageAccounts";
import RemindersView from "./components/ReminderView";
import PublicViewing from "./pages/publicViewing";
import EnterId from "./pages/EnterId";
import PublicViewImmu from "./pages/PublicViewImmu";
import AddAdmin from "./components/AddAdmin";
import ViewMessage from "./components/ViewMessage";
import AddMessage from "./components/modals/AddMessage";

const isAdmin = () => {
  return localStorage.getItem("role") === "president" ? true : false;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* publicViewing outside of the main structure */}
        <Route path="/publicViewing" element={<PublicViewing />} />
        <Route path="/enterId" element={<EnterId />} />
        <Route path="/publicviewImmu/:childId" element={<PublicViewImmu />} />

        {/* Main structure with NavBar, SideBar, and main content */}
        <Route
          path="/*"
          element={
            <>
              <section className="fixed z-40 w-full">
                <NavBar />
              </section>
              <section className="fixed h-screen ml-4 w-fit top-20">
                <SideBar />
              </section>
              <section className="float-right my-20 mr-5 rounded-lg main-content">
                <Routes>
                  {/* Rest of your routes */}
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/listofchildren" element={<ListOfChildren />} />
                  <Route path="/bmitracking" element={<BMITracking />} />
                  <Route path="/addchildinfo" element={<AddChildInfo />} />
                  <Route
                    path="/viewbmitracking/:childId"
                    element={<ViewBMITracking />}
                  />
                  <Route
                    path="/viewbmitracking/addbmi/:childId"
                    element={<AddBMI />}
                  />
                  <Route
                    path="/viewbmitracking/addmedicalhistory/:childId"
                    element={<AddMedicalHistory />}
                  />
                  <Route path="/immunization" element={<Immunization />} />
                  <Route
                    path="/viewimmunization/:childId"
                    element={<ViewImmunization />}
                  />
                  <Route
                    path="/addimmunization"
                    element={<AddImmunization />}
                  />
                  <Route path="/reminders" element={<Reminders />} />
                  <Route path="/addMessage" element={<AddMessage />} />
                  <Route path="/remindersView" element={<RemindersView />} />
                  <Route
                    path="/viewMessages/:parentID/:childID"
                    element={<ViewMessage />}
                  />

                  {/* Manage Accounts */}
                  {isAdmin() ? (
                    <>
                      <Route
                        path="/manageaccounts"
                        element={<ManageAccounts />}
                      />
                      <Route path="/addadmin" element={<AddAdmin />} />
                    </>
                  ) : null}
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
