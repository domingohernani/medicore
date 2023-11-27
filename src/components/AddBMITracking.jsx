import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function addBMITracking() {
  const navigate = useNavigate();
  console.log("AddBMITracking was rendered");
  return (
    <section className="w-9/12 mx-auto">
      <section className="p-3 text-center bg-white border rounded-lg border-C0076BE text-blue-950">
        <p className="text-3xl">Body Mass Index Child Information Form</p>
        <p>
          Please provide the child's information below, so we can include it in
          the BMI tracking record
        </p>
      </section>
      <section className="mt-3 bg-white border rounded-lg border-C0076BE">
        <div className="px-5 py-4 border-b border-C0076BE">
          Child’s Information
        </div>
        <div className="flex items-center justify-end gap-2 px-5 my-3 mr-auto ">
          <label className="font-semibold">Date</label>
          <input
            type="date"
            className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
          />
        </div>
        <div className="flex px-5 gap-7">
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter child's name"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Birthdate</label>
            <input
              type="date"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Age</label>
            <input
              type="number"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
            />
          </div>
        </div>
        <div className="flex px-5 gap-7">
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Sex</label>
            <select className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950">
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
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Contact No.</label>
            <input
              type="number"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
            />
          </div>
        </div>
        <div className="flex flex-col px-5">
          <label className="font-semibold">Address</label>
          <input
            type="text"
            placeholder="Enter child address"
            className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
          />
        </div>
        <div className="flex gap-5 px-5">
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Mother's Name</label>
            <input
              type="text"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Father's Name</label>
            <input
              type="text"
              className="px-1 py-2 pl-3 bg-white border rounded-lg border-blue-950"
            />
          </div>
        </div>
        <div className="flex w-4/6 gap-5 mx-auto mt-3">
          <div className="flex flex-col flex-1">
            <label className="font-semibold">Weight</label>
            <div className="flex">
              <input
                type="number"
                className="px-1 py-2 pl-3 bg-white border rounded-l-lg border-blue-950"
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
              />
              <span className="flex items-center justify-center px-3 pl-3 border rounded-r-lg border-blue-950">
                M
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-3/6 mx-auto mt-5 mb-8 gap-9">
          <button
            className="flex-1 text-white"
            onClick={() => {
              navigate("/bmitracking");
            }}
          >
            Add
          </button>
          <button
            className="flex-1 text-gray-500 bg-CEDEDED border-blue-950"
            onClick={() => {
              navigate("/bmitracking");
            }}
          >Cancel</button>
        </div>
      </section>
    </section>
  );
}
