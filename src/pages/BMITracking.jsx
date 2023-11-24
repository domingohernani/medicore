import React from "react";
import addIcon from "../assets/bmitrackingassets/addIcon.svg";
import info from "../assets/bmitrackingassets/info.svg";
import { NavLink } from "react-router-dom";

export default function BMITracking() {
  // TODO:
  // Change the bg color of the "active"
  const childId = 345;

  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="px-6 py-2 font-semibold bg-white rounded-lg">
          Body Mass Index Tracking
        </h3>
        <NavLink to={"/addchildinfo"}>
          <button className="flex items-center justify-center gap-1 text-white bg-C0076BE">
            <img src={addIcon} alt="" width={"25px"} /> Add New
          </button>
        </NavLink>
      </div>
      <table className="w-full mt-3 bg-white border border-collapse rounded-lg table-auto">
        <thead>
          <tr className="my-5 text-left border-b">
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Emma Watsons</td>
            <td>4</td>
            <td>Female</td>
            <td>Active</td>
            <td className="text-blue-600 underline cursor-pointer ">
              <div className="flex items-center justify-center gap-2">
                <img src={info} alt="" width={"20px"} />
                <NavLink to={"/viewbmitracking/" + childId}>
                  View info
                </NavLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
