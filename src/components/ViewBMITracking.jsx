import React from "react";
import back from "../assets/bmitrackingassets/back.svg";
import { useNavigate } from "react-router-dom";

export default function ViewBMITracking() {
  const navigate = useNavigate();
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
          <button className="py-3 font-normal text-white bg-C1886C3 ">
            Add Body Mass Index
          </button>
          <button className="py-3 font-normal text-white bg-C1886C3 ">
            Add Medical History
          </button>
        </div>
      </div>
      <div></div>
    </section>
  );
}
