import React, { useState } from "react";
import addIcon from "../assets/bmitrackingassets/addIcon.svg";
import info from "../assets/bmitrackingassets/info.svg";
import filter from "../assets/bmitrackingassets/filterIcon.svg";
import { NavLink, useSearchParams } from "react-router-dom";
import Deactivation from "../components/modals/Deactivation";

export default function BMITracking() {
  const [statusModal, setStatusModal] = useState(false);

  const toggleDeactivationModal = () => {
    setStatusModal(!statusModal);
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
          <input type="text" className="w-2/3 h-8 pl-3 rounded-lg bg-CD9D9D9" placeholder="Search by name"/>
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
              <select className="font-medium text-center border-2 border-white outline-none ">
                <option
                  value="active"
                  key="active"
                  className="border-none outline-none"
                >
                  Active
                </option>
                <option
                  value="active"
                  key="active"
                  className="border-none outline-none"
                >
                  Completed
                </option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Emma Watsons</td>
            <td>4</td>
            <td>Female</td>
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
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}