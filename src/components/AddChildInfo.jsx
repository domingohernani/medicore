import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddChildInfo() {
  const navigate = useNavigate();

  // Value na kailangan i-aadd sa database
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(Date());
  const [sex, setSex] = useState("Male");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [number, setNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [mother, setMother] = useState("");
  const [father, setFather] = useState("");

  console.log("AddBMITracking was rendered");

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addButton = async () => {
    if (
      !name ||
      !birthdate ||
      !sex ||
      !placeOfBirth ||
      !number ||
      !address ||
      !mother ||
      !father
    ) {
      alert("Please fill in all the fields");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8800/addchildinfo`, {
        name,
        birthdate,
        sex,
        placeOfBirth,
        number,
        address,
        mother,
        father,
      });
      console.log(response);
      if (response.data.reloadPage) {
        navigate("/listofchildren");
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.put(`http://localhost:8800/addchildinfoParent`, {
        childId,
        mother,
        father,
      });
      if (response.data.reloadPage) {
        navigate("/listofchildren");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Name:", name);
    console.log("Birthdate:", birthdate);
    console.log("Sex:", sex);
    console.log("Place of Birth:", placeOfBirth);
    console.log("Number:", number);
    console.log("Address:", address);
    console.log("Mother:", mother);
    console.log("Father:", father);
  };

  return (
    <section className="w-9/12 mx-auto">
      <section className="p-3 text-center bg-white border rounded-lg border-C0076BE text-blue-950">
        <p className="text-3xl">Child Information Form</p>
        <p>Please provide the child's information below</p>
      </section>
      <section className="mt-3 bg-white border rounded-lg border-C0076BE">
        <div className="px-5 py-4 border-b border-C0076BE">
          Child’s Information
        </div>
        <div className="flex items-center justify-end gap-2 px-5 my-3 mr-auto ">
          <label className="font-semibold">Date</label>
          <input
            type="date"
            className="px-1 py-2 pl-3 text-center bg-white border rounded-lg border-blue-950"
            value={getCurrentDate()}
            readOnly
          />
        </div>
        <div className="flex px-5 gap-7">
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter child's name"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Birthdate</label>
            <input
              type="date"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const formattedDate = selectedDate.toISOString().slice(0, 10);
                setBirthdate(formattedDate);
              }}
            />
          </div>
          {/* <div className="flex flex-col">
            <label className="font-semibold">Age</label>
            <input
              type="number"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
              onChange={(e) => setAge(e.target.value)}
            />
          </div> */}
        </div>
        <div className="flex px-5 gap-7">
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Sex</label>
            <select
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="Male" key="male">
                Male
              </option>
              <option value="Female" key="female">
                Female
              </option>
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Place of birth</label>
            <input
              type="text"
              placeholder="Enter child's place of birth"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
              onChange={(e) => setPlaceOfBirth(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Contact No.</label>
            <input
              type="number"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col px-5">
          <label className="font-semibold">Address</label>
          <input
            type="text"
            placeholder="Enter child address"
            className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex gap-5 px-5">
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Mother's Name</label>
            <input
              type="text"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
              onChange={(e) => setMother(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Father's Name</label>
            <input
              type="text"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
              onChange={(e) => setFather(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-4/6 gap-5 mx-auto mt-3">
          {/* <div className="flex flex-col flex-1">
            <label className="font-semibold">Weight</label>
            <div className="flex">
              <input
                type="number"
                className="px-1 py-2 pl-3 bg-white border rounded-l-lg border-blue-950"
                onChange={(e) => setWeight(e.target.value)}
              />
              <span className="flex items-center justify-center px-3 pl-3 border rounded-r-lg border-blue-950">
                KG
              </span>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Height</label>
            <div className="flex">
              <input
                type="number"
                className="px-1 py-2 pl-3 bg-white border rounded-l-lg border-blue-950"
                onChange={(e) => setHeight(e.target.value)}
              />
              <span className="flex items-center justify-center px-3 pl-3 border rounded-r-lg border-blue-950">
                CM
              </span>
            </div>
          </div> */}
        </div>
        <div className="flex w-3/6 mx-auto mt-5 mb-8 gap-9">
          <button className="flex-1 text-white" onClick={addButton}>
            Add
          </button>
          <button
            className="flex-1 text-gray-500 bg-CEDEDED border-blue-950"
            onClick={() => {
              navigate("/listofchildren");
            }}
          >
            Cancel
          </button>
        </div>
      </section>
    </section>
  );
}
