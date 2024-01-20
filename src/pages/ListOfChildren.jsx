import React, { useEffect, useState } from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import addIcon from "../assets/bmitrackingassets/addIcon.svg";
import filter from "../assets/bmitrackingassets/filterIcon.svg";
import axios from "axios";
import info from "../assets/bmitrackingassets/info.svg";
import { NavLink } from "react-router-dom";

export default function ListOfChildren() {
  const [children, setChildren] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchAllChild = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8800/listofchildren"
        );
        setChildren(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllChild();
  }, []);

  const handleSort = (property) => {
    if (sortBy === property) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(property);
      setSortOrder("asc");
    }
  };

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;
    const ageInMonths = Math.floor(
      ageInMilliseconds / (30.44 * 24 * 60 * 60 * 1000)
    );
    return ageInMonths;
  };

  const sortedChildren = [...children].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "age") {
      const ageA = calculateAge(a.date_of_birth);
      const ageB = calculateAge(b.date_of_birth);
      return sortOrder === "asc" ? ageA - ageB : ageB - ageA;
    } else if (sortBy === "sex") {
      return sortOrder === "asc"
        ? a.sex.localeCompare(b.sex)
        : b.sex.localeCompare(a.sex);
    }
    return 0;
  });

  return (
    <section>
      {/* <WelcomeBanner></WelcomeBanner> */}
      <div className="flex items-center justify-center">
        <h3 className="px-6 py-2 font-semibold bg-white rounded-lg">
          List Of Children
        </h3>
        <div className="flex items-center flex-1 gap-2 ml-4">
          <input
            type="text"
            className="w-2/3 h-8 pl-3 rounded-lg bg-CD9D9D9"
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="flex items-center justify-center h-8 gap-1 px-2 text-sm text-white rounded-lg bg-C5FA9D6">
            <img src={filter} alt="" width={"20px"} />
            <select
              className="flex items-center justify-center h-8 gap-1 px-2 text-sm text-white rounded-lg focus:outline-none bg-C5FA9D6"
              onChange={(e) => {
                handleSort(e.target.value);
              }}
            >
              <option value={"child_id"}>Child ID</option>
              <option value={"name"}>Name</option>
              <option value={"age"}>Age</option>
              <option value={"sex"}>Sex</option>
            </select>
          </button>
        </div>
        <NavLink to={"/addchildinfo"}>
          <button className="flex items-center justify-center gap-1 text-white bg-C0076BE">
            <img src={addIcon} alt="" width={"25px"} /> Add New Record
          </button>
        </NavLink>
      </div>
      <table className="w-full mt-3 bg-white border border-collapse rounded-lg table-auto">
        <thead>
          <tr className="my-5 text-center border-b">
            <th
              onClick={() => handleSort("child_id")}
              className="px-9 cursor-pointer"
              title="Sort by Child ID"
            >
              Child ID
            </th>
            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer"
              title="Sort by name"
            >
              Name
            </th>
            <th
              onClick={() => handleSort("age")}
              className="cursor-pointer"
              title="Sort by age"
            >
              Age
            </th>
            <th
              onClick={() => handleSort("sex")}
              className="cursor-pointer"
              title="Sort by sex"
            >
              Sex
            </th>
            <th onClick={() => handleSort("address")}>Address</th>
            <th onClick={() => handleSort("status")}>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedChildren
            .filter((child) => {
              return search.toLowerCase() === ""
                ? child
                : child.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((child, index) => {
              return (
                <tr key={index}>
                  <td>CAB-UR-{child.child_id}</td>
                  <td>{child.name}</td>
                  <td>{calculateAge(child.date_of_birth)} month/s</td>
                  <td>{child.sex}</td>
                  <td>{child.address}</td>
                  {(() => {
                    if (child.status === "Active") {
                      return <td className="text-C40BE04">{child.status}</td>;
                    } else if (child.status === "Inactive") {
                      return <td className="text-C1886C3">{child.status}</td>;
                    } else if (child.status === "Underimmunization") {
                      return <td className="text-C869EAC">{child.status}</td>;
                    } else {
                      return <td className="text-C869EAC">{child.status}</td>;
                    }
                  })()}
                  <td className="text-sm text-center text-blue-600 underline cursor-pointer">
                    <div className="flex items-center justify-center gap-2">
                      <img src={info} alt="" width={"15px"} />
                      {child.status === "Underimmunization" ? (
                        <NavLink to={`/viewimmunization/${child.child_id}`}>
                          View info
                        </NavLink>
                      ) : (
                        <NavLink to={`/viewbmitracking/${child.child_id}`}>
                          View info
                        </NavLink>
                      )}

                      {/* <NavLink to={`/viewbmitracking/${child.child_id}`}> */}
                      {/* <NavLink to={`/viewimmunization/${child.child_id}`}> */}
                      {/* <NavLink
                        {child.status === "Underimmunization"} ? 

                      >
                        View info
                      </NavLink> */}
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
