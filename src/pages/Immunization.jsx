import info from "../assets/bmitrackingassets/info.svg";
import addIcon from "../assets/bmitrackingassets/addIcon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Immunization() {
  const [children, setChildren] = useState([]);

  // Kinukuha yung mga children from the database
  useEffect(() => {
    const fetchAllChild = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/getAllCompleted"
        );
        setChildren(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllChild();
  }, []);

  const childID = 345;
  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="px-6 py-2 font-semibold bg-white rounded-lg">
          Child Immunization Records
        </h3>
        {/* <NavLink to={"/addimmunization"}>
          <button className="flex items-center justify-center gap-1 text-white bg-C0076BE">
            <img src={addIcon} alt="" width={"25px"} /> Add New
          </button>
        </NavLink> */}
      </div>
      <table className="w-full mt-3 bg-white border border-collapse rounded-lg table-auto">
        <thead>
          <tr className="my-5 text-center border-b">
            <th>Child ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Zone</th>
            <th>Status</th>
            <th className="text-right">
              <label className="font-medium">Filter By: </label>
              <select className="font-medium text-center border-2 border-white outline-none ">
                {/* {/* <option
                  value="active"
                  key="active"
                  className="border-none outline-none"
                >
                  Active
                </option> */}
                <option
                  value="completed"
                  key="completed"
                  className="border-none outline-none"
                >
                  Active
                </option>
                <option
                  value="inactive"
                  key="inactive"
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
                <td>CAB-UR-{child.child_id}</td>
                <td>{child.name}</td>
                <td>{child.age}</td>
                <td>{child.sex}</td>
                <td>Zone {child.zone_number}</td>
                {(() => {
                  if (child.status === "Active") {
                    return <td className="text-C40BE04">{child.status}</td>;
                  } else if (child.status === "Inactive") {
                    return <td className="text-C1886C3">{child.status}</td>;
                  } else {
                    return <td className="text-C869EAC">{child.status}</td>;
                  }
                })()}
                <td className="text-blue-600 underline cursor-pointer ">
                  <div className="flex items-center justify-center gap-2">
                    <img src={info} alt="" width={"20px"} />
                    <NavLink to={`/viewimmunization/${child.child_id}`}>
                      View info
                    </NavLink>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
