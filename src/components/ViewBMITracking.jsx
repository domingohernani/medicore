import React, { useState, useEffect } from "react";
import back from "../assets/bmitrackingassets/back.svg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import AddBMI from "./AddBMI";
import axios from "axios";

export default function ViewBMITracking() {
  const [childDetails, setChildDetails] = useState({});
  const navigate = useNavigate();
  const { childId } = useParams();

  const showStatusTag = (status) => {
    const statusConfig = {
      Active: {
        className: "text-C40BE04",
        label: "Active",
      },
      Inactive: {
        className: "text-C1886C3",
        label: "Inactive",
      },
      Completed: {
        className: "text-C869EAC",
        label: "Completed",
      },
    };

    const config = statusConfig[status] || statusConfig.Completed;

    return <span className={config.className}>{config.label}</span>;
  };

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/viewbmitracking/${childId}`
        );
        setChildDetails(response.data[0]);
        setMothersName(response.data[1].parent_name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChildDetails();
  }, [childId]);

  console.log("ViewBMITracking was rendered");
  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div
          className="p-1 bg-white rounded-full cursor-pointer w-fit"
          onClick={() => navigate("/bmitracking")}
        >
          <img src={back} alt="" width={"40px"} />
        </div>
        <h3 className="flex-1 px-6 py-4 mx-6 text-lg font-normal text-center text-blue-600 bg-white rounded-lg w-fit ">
          Body Mass Index Tracking Information
        </h3>
        <div className="flex items-center gap-4">
          <NavLink to={"/viewbmitracking/addbmi/" + childId}>
            <button className="py-3 font-normal text-white bg-C1886C3">
              Add Body Mass Index
            </button>
          </NavLink>
          <NavLink to={"/viewbmitracking/addmedicalhistory/" + childId}>
            <button className="py-3 font-normal text-white bg-C1886C3 ">
              Add Medical History
            </button>
          </NavLink>
        </div>
      </div>
      <section className="flex gap-3 mt-2">
        <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-white rounded-lg">
          <span className="col-start-1 col-end-5 font-light">
            ID: CAB-UR-{childDetails.child_id}
          </span>
          <div className="flex flex-col ">
            <span>Name</span>
            <span className="font-bold">{childDetails.name}</span>
          </div>
          <div className="flex flex-col">
            <span>Age</span>
            <span className="font-bold">{childDetails.age}</span>
          </div>
          <div className="flex flex-col">
            <span>Gender</span>
            <span className="font-bold">{childDetails.sex}</span>
          </div>
          <div className="flex flex-col">
            <span>Birthdate</span>
            <span className="font-bold">{childDetails.date_of_birth}</span>
          </div>
          <div className="flex flex-col">
            <span>Place of birth</span>
            <span className="font-bold">{childDetails.place_of_birth}</span>
          </div>
          <div className="flex flex-col">
            <span>Contact no.</span>
            <span className="font-bold">{childDetails.family_number}</span>
          </div>
          <div className="flex flex-col">
            <span>Mother's Name</span>
            <span className="font-bold">{childDetails.mother}</span>
          </div>
          <div className="flex flex-col">
            <span>Father's Name</span>
            <span className="font-bold">{childDetails.father}</span>
          </div>
          <div className="flex flex-col col-span-3 ">
            <span>Address</span>
            <span className="font-bold">{childDetails.address}</span>
          </div>
          <div className="">
            <span>Status: </span>
            {showStatusTag(childDetails.status)}
          </div>
        </div>
        <div className="py-3 overflow-y-scroll text-center bg-white rounded-lg max-h-72 px-7">
          <span>Prescription</span>
          <hr className="my-4 prescriptionHr" />
          <ul className="text-left list-disc">
            <li>Prutas, gulay, o supplement para sa resistensya.</li>
            <li>Vitamin C: Mula sa prutas o supplement.</li>
            <li>Prutas, gulay, o supplement para sa resistensya.</li>
            <li>Vitamin C: Mula sa prutas o supplement.</li>
            <li>Prutas, gulay, o supplement para sa resistensya.</li>
            <li>Vitamin C: Mula sa prutas o supplement.</li>
            <li>Prutas, gulay, o supplement para sa resistensya.</li>
            <li>Vitamin C: Mula sa prutas o supplement.</li>
          </ul>
        </div>
      </section>
      <section className="flex gap-2 mt-3">
        <div className="flex flex-col flex-1 gap-3 px-5 py-3 bg-white rounded-lg">
          <h4 className="text-blue-600">Medical History & Records</h4>
          <hr className="flex-1" />
          <ul className="px-8 py-2 text-left text-gray-500 list-disc bg-white rounded-lg medicalhistoryrecords ">
            <li>
              <span className="block">Date: January 25,2023</span>
              <span className="block">Allergies: N/A</span>
              <span className="block">Temperature: 36.25</span>
              <span className="block">Coughs: No</span>
              <span className="block">Colds: No</span>
            </li>
            <li>
              <span className="block">Date: January 25,2023</span>
              <span className="block">Allergies: N/A</span>
              <span className="block">Temperature: 36.25</span>
              <span className="block">Coughs: No</span>
              <span className="block">Colds: No</span>
            </li>
            <li>
              <span className="block">Date: January 25,2023</span>
              <span className="block">Allergies: N/A</span>
              <span className="block">Temperature: 36.25</span>
              <span className="block">Coughs: No</span>
              <span className="block">Colds: No</span>
            </li>
            <li>
              <span className="block">Date: January 25,2023</span>
              <span className="block">Allergies: N/A</span>
              <span className="block">Temperature: 36.25</span>
              <span className="block">Coughs: No</span>
              <span className="block">Colds: No</span>
            </li>
            <li>
              <span className="block">Date: January 25,2023</span>
              <span className="block">Allergies: N/A</span>
              <span className="block">Temperature: 36.25</span>
              <span className="block">Coughs: No</span>
              <span className="block">Colds: No</span>
            </li>
            <li>
              <span className="block">Date: January 25,2023</span>
              <span className="block">Allergies: N/A</span>
              <span className="block">Temperature: 36.25</span>
              <span className="block">Coughs: No</span>
              <span className="block">Colds: No</span>
            </li>
          </ul>
        </div>
        <div className="w-64 mx-1">
          <span className="block px-4 py-2 text-blue-600 bg-white rounded-lg">
            BMI History
          </span>
          <ul className="px-8 py-2 mt-3 text-gray-500 list-disc rounded-lg bmiHistory ">
            <li>
              <span>Date: January 2023</span>
              <ul className="px-6 py-2 list-disc ">
                <li>Weight: 20 kg</li>
                <li>Height: 1.092</li>
                <li>BMI: 16.80</li>
                <li>
                  Interpretation: <span className="text-C40BE04">NORMAL</span>
                </li>
              </ul>
            </li>
            <li>
              <span>Date: January 2023</span>
              <ul className="px-6 py-2 list-disc ">
                <li>Weight: 20 kg</li>
                <li>Height: 1.092</li>
                <li>BMI: 16.80</li>
                <li>
                  Interpretation: <span className="text-C40BE04">NORMAL</span>
                </li>
              </ul>
            </li>
            <li>
              <span>Date: January 2023</span>
              <ul className="px-6 py-2 list-disc ">
                <li>Weight: 20 kg</li>
                <li>Height: 1.092</li>
                <li>BMI: 16.80</li>
                <li>
                  Interpretation: <span className="text-C40BE04">NORMAL</span>
                </li>
              </ul>
            </li>
            <li>
              <span>Date: January 2023</span>
              <ul className="px-6 py-2 list-disc ">
                <li>Weight: 20 kg</li>
                <li>Height: 1.092</li>
                <li>BMI: 16.80</li>
                <li>
                  Interpretation: <span className="text-C40BE04">NORMAL</span>
                </li>
              </ul>
            </li>
            <li>
              <span>Date: January 2023</span>
              <ul className="px-6 py-2 list-disc ">
                <li>Weight: 20 kg</li>
                <li>Height: 1.092</li>
                <li>BMI: 16.80</li>
                <li>
                  Interpretation: <span className="text-C40BE04">NORMAL</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
}
