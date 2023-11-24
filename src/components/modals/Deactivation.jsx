import React from "react";
import ReactDOM from "react-dom";
import Alert from "../modals/alert.svg";

export default function Deactivation({ toggleDeactivationModal }) {
  return ReactDOM.createPortal(
    <section
      className="absolute flex items-center justify-center w-full h-full bg-opacity-50 alertModal bg-CD9D9D9"
      id="deactivationModal"
    >
      <div className="flex flex-col items-center gap-2 px-8 py-12 bg-white rounded-lg">
        <img src={Alert} alt="illustration" width="140px" />
        <h4 className="font-semibold">Are you sure you want to deactivate?</h4>
        <div className="flex gap-3 mt-3">
          <button className="flex-1 px-10 py-1 text-white bg-C0D3E5A bg-C" onClick={toggleDeactivationModal}>
            No
          </button>
          <button className="flex-1 px-10 py-1 border-2 bg-C869EAC border-C0D3E5A text-blue-950" onClick={toggleDeactivationModal}>
            Yes
          </button>
        </div>
      </div>
    </section>,
    document.getElementById("deactivationModal")
  );
}
