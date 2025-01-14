import React, { useState, useEffect } from "react";
import WelcomeIllustration from "../assets/dashboardassets/welcomeillustration.svg";
import baby from "../assets/baby.png";
import axios from "axios";
import BMIChart from "../components/BMIChart ";
import AdministeredVaccinesChart from "../components/AdministeredVaccinesChart";

export default function Dashboard() {
  const [actives, setActives] = useState(0);
  const [under, setUnder] = useState(0);
  const [complete, setComplete] = useState(0);
  const [currentDate, setCurrentDate] = useState({
    dayName: "",
    dayNumber: "",
    year: "",
  });

  useEffect(() => {
    // Fetch active, under immunization, and completed data
    const fetchAllActive = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/activeBMI`
        );
        setActives(response.data.length);
      } catch (error) {
        console.log(error);
      }
      try {
        const responseUnderImmu = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/getUnderImmunization`
        );
        setUnder(responseUnderImmu.data[0].number);
      } catch (error) {
        console.log(error);
      }
      try {
        const responseCom = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/getCompleted`
        );
        setComplete(responseCom.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch current date
    const updateDate = () => {
      const today = new Date();
      const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
      const dayNumber = today.getDate();
      const year = today.getFullYear();
      setCurrentDate({ dayName, dayNumber, year });
    };

    fetchAllActive();
    updateDate();
  }, []);

  return (
    <main className="!bg-primary">
      <div className="flex gap-5 mb-5">
        {/* <div
          className="flex flex-1 rounded-lg"
          style={{ backgroundColor: "#63ADD8" }}
        >
          <div className="flex flex-col items-center justify-center flex-1 gap-6">
            <h1
              className="text-5xl font-bold text-center"
              style={{ color: "#004AAD" }}
            >
              WELCOME TO VAXTRACK
            </h1>
            <p className="text-2xl text-center" style={{ color: "#004AAD" }}>
              Barangay Health Center
            </p>
          </div>
          <div>
            <img src={baby} className="h-auto w-44" alt="Baby" />
          </div>
        </div> */}
        {/* <div className="basis-80">
          <div className="py-4 text-center text-white bg-blue-800 rounded-t-xl">
            TODAY
          </div>
          <div className="flex flex-col items-center gap-2 py-5 bg-white">
            <h1 className="text-xl font-medium">{currentDate.dayName}</h1>
            <h1 className="text-4xl font-medium">{currentDate.dayNumber}</h1>
            <h1 className="text-xl font-medium">{currentDate.year}</h1>
          </div>
        </div> */}
      </div>
      <div className="flex flex-row gap-3 mx-auto mb-3">
        <div className="flex-1 p-5 text-center bg-gray-100 rounded-xl">
          <h1 className="text-black">{actives}</h1>
          <p>Total children with tracked BMI</p>
        </div>
        <div className="flex-1 p-5 text-center bg-gray-100 rounded-xl">
          <h1 className="text-black">{under}</h1>
          <p>Total number of children undergoing immunization</p>
        </div>
        <div className="flex-1 p-5 text-center bg-gray-100 rounded-xl">
          <h1 className="text-black">{complete}</h1>
          <p>Total number of children with complete immunization</p>
        </div>
      </div>
      <section className="flex gap-6 ">
        <section className="flex-1 w-full">
          <BMIChart />
        </section>
        {/* <section className="flex-1">
          <AdministeredVaccinesChart />
        </section> */}
      </section>
    </main>
  );
}
