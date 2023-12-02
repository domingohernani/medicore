import React, { useEffect, useState } from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import axios from "axios";
import info from "../assets/bmitrackingassets/info.svg";
import { NavLink } from "react-router-dom";

export default function ListOfChildren() {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchAllChild = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8800/listofchildren"
        );
        setChildren(data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllChild();
  }, []);

  return (
    <section>
      <WelcomeBanner></WelcomeBanner>
      <table className="w-full mt-3 bg-white border border-collapse rounded-lg table-auto">
        <thead>
          <tr className="my-5 text-center border-b">
            <th>Child ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Zone</th>
            <th>Status</th>
            <th></th>
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
                <td>{child.zone_number}</td>
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
                    <NavLink to={`/viewbmitracking/${child.child_id}`}>
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
