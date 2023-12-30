import React, { useState, useEffect } from "react";
import back from "../assets/bmitrackingassets/back.svg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import AddBMI from "./AddBMI";
import axios from "axios";
import editIcon from "../assets/bmitrackingassets/editIcon.svg";
import cancelIcon from "../assets/bmitrackingassets/cancelIcon.svg";
import applyIcon from "../assets/bmitrackingassets/applyIcon.svg";
import Prescription from "./Prescription";

export default function ViewBMITracking() {
  const [childDetails, setChildDetails] = useState({});
  const [bmiHistory, setBmiHistory] = useState([]);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const navigate = useNavigate();
  const { childId } = useParams();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  let [birthdate, setBirthdate] = useState("");
  const [placeofbirth, setPlaceofbirth] = useState("");
  const [number, setNumber] = useState("");
  const [mothersname, setMothersname] = useState("");
  const [fathersname, setFathersname] = useState("");
  const [address, setAddress] = useState("");

  const calculateBMI = (weightInKg, heightInCm, dateOfBirth, sex) => {
    // Calculate age based on the current date and date of birth
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const ageInMonths =
      (currentDate.getFullYear() - birthDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      birthDate.getMonth();

    const heightInMeters = heightInCm / 100;

    const bmi = (weightInKg / Math.pow(heightInMeters, 2)).toFixed(2);

    const bmiCategories = {
      underweight: { upperLimit: 18.4, category: "Underweight" },
      normal: { upperLimit: 24.9, category: "Normal" },
      overweight: { upperLimit: 29.9, category: "Overweight" },
      obese: { upperLimit: Number.POSITIVE_INFINITY, category: "Obese" },
    };

    if (sex === "Male" && ageInMonths >= 24) {
      bmiCategories.underweight.upperLimit = 17.9;
      bmiCategories.normal.upperLimit = 23.9;
    } else if (sex === "Female" && ageInMonths >= 24) {
      bmiCategories.underweight.upperLimit = 17.9;
      bmiCategories.normal.upperLimit = 23.9;
    }

    let bmiCategory = Object.keys(bmiCategories).find(
      (category) => bmi <= bmiCategories[category].upperLimit
    );
    bmiCategory = bmiCategories[bmiCategory].category;

    return (
      <>
        <li>BMI: {bmi}</li>
        <li>
          Interpretation: <span className="text-C40BE04">{bmiCategory}</span>
        </li>
      </>
    );
  };

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
      Underimmunization: {
        className: "text-gray",
        label: "Underimmunization",
      },
    };

    const config = statusConfig[status] || statusConfig.Completed;

    return <span className={config.className}>{config.label}</span>;
  };

  const updateRecord = () => {
    setUpdateButtonClicked(!updateButtonClicked);
  };

  const formatDateForInput = (serverDate) => {
    const date = new Date(serverDate);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const applyChanges = async (childID) => {
    birthdate = formatDateForInput(birthdate);
    try {
      const response = await axios.put(
        "http://localhost:8800/updateChildDetailsFromImmu",
        {
          name,
          birthdate,
          placeofbirth,
          gender,
          number,
          mothersname,
          fathersname,
          address,
          childID,
        }
      );
      console.log(response);
      if (response.data.reloadPage) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.put("http://localhost:8800/updateParents", {
        childID,
        fathersname,
        mothersname,
      });
      console.log(response);
      if (response.data.reloadPage) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const capitalizeAfterSpace = (inputString) => {
    const words = inputString.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const resultString = capitalizedWords.join(" ");

    return resultString;
  };

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8800/viewbmitracking/${childId}`
        );
        setChildDetails(data.childDetails[0]);
        setName(data.childDetails[0].name);
        setGender(data.childDetails[0].sex);
        setBirthdate(data.childDetails[0].date_of_birth);
        setPlaceofbirth(data.childDetails[0].place_of_birth);
        setNumber(data.childDetails[0].family_number);
        setMothersname(data.childDetails[0].mother);
        setFathersname(data.childDetails[0].father);
        setAddress(data.childDetails[0].address);

        setBmiHistory(data.bmiHistory);
        setHistoryRecords(data.historyRecords);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChildDetails();
  }, [childId]);

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
      <section className="flex gap-3 mt-2 ">
        <div className="grid flex-1 grid-cols-4 gap-4 px-5 py-3 bg-white rounded-lg">
          <span className="col-start-1 col-end-4 font-light">
            ID: CAB-UR-{childDetails.child_id}
          </span>
          <span className="flex items-center justify-end col-start-4 col-end-4 gap-2 font-light ">
            {updateButtonClicked ? (
              <>
                <img
                  src={applyIcon}
                  alt="icon"
                  width={"20px"}
                  className="cursor-pointer"
                  title="Apply changes"
                  onClick={() => applyChanges(childDetails.child_id)}
                />
                <img
                  src={cancelIcon}
                  alt="icon"
                  width={"20px"}
                  className="cursor-pointer"
                  title="Cancel changes"
                  onClick={() => setUpdateButtonClicked(false)}
                />
              </>
            ) : null}
            <img
              src={editIcon}
              alt="icon"
              width={"18px"}
              className="cursor-pointer"
              onClick={updateRecord}
            />
          </span>
          <div className="flex flex-col ">
            <span>Name</span>
            {updateButtonClicked ? (
              <input
                type="text"
                placeholder={childDetails.name}
                className="font-bold"
                value={name}
                onChange={(e) => setName(capitalizeAfterSpace(e.target.value))}
              />
            ) : (
              <span className="font-bold">{childDetails.name}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span>Age</span>
            <span className="font-bold">{childDetails.age}</span>
          </div>
          <div className="flex flex-col">
            <span>Gender</span>
            {updateButtonClicked ? (
              <input
                type="text"
                placeholder={childDetails.sex}
                className="font-bold"
                value={gender}
                onChange={(e) =>
                  setGender(capitalizeAfterSpace(e.target.value))
                }
              />
            ) : (
              <span className="font-bold">{childDetails.sex}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span>Birthdate</span>
            {updateButtonClicked ? (
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            ) : (
              <span className="font-bold">{childDetails.date_of_birth}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span>Place of birth</span>
            {updateButtonClicked ? (
              <input
                type="text"
                placeholder={childDetails.place_of_birth}
                className="font-bold"
                value={placeofbirth}
                onChange={(e) =>
                  setPlaceofbirth(capitalizeAfterSpace(e.target.value))
                }
              />
            ) : (
              <span className="font-bold">{childDetails.place_of_birth}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span>Contact no.</span>
            {updateButtonClicked ? (
              <input
                type="number"
                placeholder={childDetails.family_number}
                className="font-bold"
                value={number}
                onChange={(e) =>
                  setNumber(capitalizeAfterSpace(e.target.value))
                }
              />
            ) : (
              <span className="font-bold">{childDetails.family_number}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span>Mother's Name</span>
            {updateButtonClicked ? (
              <input
                type="text"
                className="font-bold"
                placeholder={childDetails.mother}
                value={mothersname}
                onChange={(e) =>
                  setMothersname(capitalizeAfterSpace(e.target.value))
                }
              />
            ) : (
              <span className="font-bold">{childDetails.mother}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span>Father's Name</span>
            {updateButtonClicked ? (
              <input
                type="text"
                className="font-bold"
                placeholder={childDetails.father}
                value={fathersname}
                onChange={(e) =>
                  setFathersname(capitalizeAfterSpace(e.target.value))
                }
              />
            ) : (
              <span className="font-bold">{childDetails.father}</span>
            )}
          </div>
          <div className="flex flex-col col-span-3 ">
            <span>Address</span>
            {updateButtonClicked ? (
              <input
                type="text"
                className="font-bold"
                placeholder={childDetails.address}
                value={address}
                onChange={(e) =>
                  setAddress(capitalizeAfterSpace(e.target.value))
                }
              />
            ) : (
              <span className="font-bold">{childDetails.address}</span>
            )}
          </div>
          <div className="">
            <span>Status: </span>
            {showStatusTag(childDetails.status)}
          </div>
        </div>
        <div className="pb-3 overflow-y-scroll text-center rounded-lg max-h-80">
          {/* <span className="text-base">Prescription</span>
          <hr className="my-4 prescriptionHr" />
          <ul className="text-left list-disc">
            {bmiHistory.length > 0 ? (
              <Prescription
                height={bmiHistory[0].height}
                weight={bmiHistory[0].weight}
              ></Prescription>
            ) : (
              <span className="text-center">No BMI available</span>
            )}
          </ul> */}

          {/*  */}
          <span className="block px-4 py-2 text-blue-600 bg-white rounded-lg mr-7">
            BMI History
          </span>
          <ul className="w-full py-2 mt-3 text-gray-500 list-disc rounded-lg bmiHistory ">
            {bmiHistory.map((bmi, element) => {
              return (
                <li key={element}>
                  <span>Date: {bmi.ht_date}</span>
                  <ul className="px-10 py-2 ">
                    <li>Weight: {bmi.weight} kg</li>
                    <li>Height: {bmi.height} cm</li>
                    {calculateBMI(bmi.weight, bmi.height)}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="flex gap-2 mt-3">
        <div className="flex-1 gap-3 rounded-lg">
          <div className="px-4 py-3 text-gray-500 bg-white rounded-lg">
            <span className="px-5 text-base text-blue-600">Prescription</span>
            <hr className="my-4 bg-gray-100 prescriptionHr" />
            <ul className="text-left list-disc px-9">
              {bmiHistory.length > 0 ? (
                <Prescription
                  height={bmiHistory[0].height}
                  weight={bmiHistory[0].weight}
                ></Prescription>
              ) : (
                <span className="text-center">No BMI available</span>
              )}
            </ul>

            {/*  */}
          </div>
          <div className="px-4 py-3 my-3 text-sm text-center bg-white rounded-lg ">
            <h4 className="px-5 text-base text-left text-blue-600">
              Medical History & Records
            </h4>
            <hr className="flex-1 mt-3" />
            <ul className="px-8 py-2 my-auto mt-4 text-left text-gray-500 list-disc rounded-lg medicalhistoryrecords">
              {historyRecords.map((record, index) => {
                return (
                  <li key={index}>
                    <span className="block">
                      Date:{" "}
                      {new Date(record.history_date).toLocaleDateString(
                        "en-CA"
                      )}
                    </span>

                    <span className="block">Allergies: {record.allergies}</span>
                    <span className="block">
                      Temperature: {record.temperature}
                    </span>
                    <span className="block">Coughs: {record.cough}</span>
                    <span className="block">Colds: {record.cold}</span>
                  </li>
                );
              })}
            </ul>

            {/* <span className="text-base">Prescription</span>
            <hr className="my-4 prescriptionHr" />
            <ul className="text-left list-disc">
              {bmiHistory.length > 0 ? (
                <Prescription
                  height={bmiHistory[0].height}
                  weight={bmiHistory[0].weight}
                ></Prescription>
              ) : (
                <span className="text-center">No BMI available</span>
              )}
            </ul> */}
          </div>
        </div>
        <div className="w-64 mx-1">
          {/* <span className="block px-4 py-2 text-blue-600 bg-white rounded-lg">
            BMI History
          </span>
          <ul className="px-5 py-2 mt-3 text-gray-500 list-disc rounded-lg bmiHistory ">
            {bmiHistory.map((bmi, element) => {
              return (
                <li key={element}>
                  <span>Date: {bmi.ht_date}</span>
                  <ul className="px-6 py-2 list-disc ">
                    <li>Weight: {bmi.weight} kg</li>
                    <li>Height: {bmi.height} cm</li>
                    {calculateBMI(bmi.weight, bmi.height)}
                  </ul>
                </li>
              );
            })}
          </ul> */}
        </div>
      </section>
    </section>
  );
}
