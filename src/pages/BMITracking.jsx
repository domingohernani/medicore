import React, { useEffect, useState } from "react";
import addIcon from "../assets/bmitrackingassets/addIcon.svg";
import info from "../assets/bmitrackingassets/info.svg";
import filter from "../assets/bmitrackingassets/filterIcon.svg";
import { NavLink, useSearchParams } from "react-router-dom";
import Deactivation from "../components/modals/Deactivation";
import axios from "axios";

export default function BMITracking() {
  const [statusModal, setStatusModal] = useState(false);
  const [children, setChildren] = useState([]);

  const handleSortChange = async (event) => {
    if (event.target.value === "active") {
      try {
        const response = await axios.get("http://localhost:8800/activeBMI");
        setChildren(response.data);
      } catch (error) {
        console.log(error);
      }
    } else if (event.target.value === "inactive") {
      try {
        const response = await axios.get("http://localhost:8800/inactiveBMI");
        setChildren(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get("http://localhost:8800/completedBMI");
        setChildren(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Kinukuha yung mga children from the database
  useEffect(() => {
    const fetchAllChild = async () => {
      try {
        const response = await axios.get("http://localhost:8800/activeBMI");
        setChildren(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllChild();
  }, []);

  const toggleDeactivationModal = () => {
    setStatusModal(!statusModal);
  };

  const showStatusButton = (child) => {
    if (child === "Active") {
      return (
        <button
          className="px-5 py-1 font-normal text-white bg-C40BE04 rounded-3xl"
          onClick={toggleDeactivationModal}
        >
          Active
        </button>
      );
    } else if (child === "Inactive") {
      <button
        className="px-5 py-1 font-normal text-white bg-C0076BE rounded-3xl"
        onClick={toggleDeactivationModal}
      >
        Active
      </button>;
    } else {
      return (
        <button
          className="px-5 py-1 font-normal text-white bg-C869EAC rounded-3xl"
          onClick={toggleDeactivationModal}
        >
          Completed
        </button>
      );
    }
  };

  const childId = 345;

  return (
    <section>
      {statusModal && (
        <Deactivation toggleDeactivationModal={toggleDeactivationModal} />
      )}
      <div className="flex items-center justify-center">
        <h3 className="px-6 py-2 font-semibold bg-white rounded-lg">
          Body Mass Index Tracking
        </h3>
        <div className="flex items-center flex-1 gap-2 ml-4">
          <input
            type="text"
            className="w-2/3 h-8 pl-3 rounded-lg bg-CD9D9D9"
            placeholder="Search by name"
          />
          <button className="flex items-center justify-center h-8 gap-1 px-2 text-sm text-white rounded-lg bg-C5FA9D6">
            <img src={filter} alt="" width={"20px"} /> Filter
          </button>
        </div>
        <NavLink to={"/addchildinfo"}>
          <button className="flex items-center justify-center gap-1 text-white bg-C0076BE">
            <img src={addIcon} alt="" width={"25px"} /> Add New
          </button>
        </NavLink>
      </div>
      <table className="w-full mt-3 bg-white border border-collapse rounded-lg table-auto">
        <thead>
          <tr className="my-5 text-center border-b">
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Status</th>
            <th className="text-right">
              <label className="font-medium">Sort By: </label>
              <select
                className="font-medium text-center border-2 border-white outline-none "
                onChange={handleSortChange}
              >
                <option
                  value="active"
                  key="active"
                  className="border-none outline-none"
                >
                  Active
                </option>
                <option
                  value="inactive"
                  key="inactive"
                  className="border-none outline-none"
                >
                  Inactive
                </option>
                <option
                  value="completed"
                  key="completed"
                  className="border-none outline-none"
                >
                  Completed
                </option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {children.map((child, index) => {
            return (
              <tr key={index}>
                <td>{child.name}</td>
                <td>{child.age}</td>
                <td>{child.sex}</td>
                <td>{showStatusButton(child.status)}</td>
                <td className="text-blue-600 underline cursor-pointer ">
                  <div className="flex items-center justify-center gap-2">
                    <img src={info} alt="" width={"20px"} />
                    <NavLink to={"/viewbmitracking/" + childId}>
                      View info
                    </NavLink>
                  </div>
                </td>
              </tr>
            );
          })}

          {/* 
          <td>
            <button
              className="px-5 py-1 font-normal text-white bg-C40BE04 rounded-3xl"
              onClick={toggleDeactivationModal}
            >
              Active
            </button>
          </td>
          <td className="text-blue-600 underline cursor-pointer ">
            <div className="flex items-center justify-center gap-2">
              <img src={info} alt="" width={"20px"} />
              <NavLink to={"/viewbmitracking/" + childId}>View info</NavLink>
            </div>
          </td> */}
        </tbody>
      </table>
    </section>
  );
}
