import React, { useState } from "react";
import ReactDOM from "react-dom";
import Alert from "../modals/alert.svg";
import Choose from "../modals/chooseActionIcon.svg";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function Deactivation({
  toggleDeactivationModal,
  childId,
  status,
}) {
  const [showModal, setShowModal] = useState(true);
  const [showInactiveModal, setShowInactiveModal] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showActiveModal, setShowActiveModal] = useState(false);
  const navigate = useNavigate();

  const inactivation = () => {
    return <></>;
  };

  const handleUpdateStatus = async (status) => {
    try {
      const response = await axios.put(
        `http://localhost:8800/updateStatusInactive/${childId}/${status}`
      );
      toggleDeactivationModal();
      console.log(response);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteSubmition = async () => {
    try {
      await axios.put(`http://localhost:8800/updateStatusCompleted/${childId}`);
      toggleDeactivationModal();
    } catch (error) {
      console.log(error);
    }
  };

  const completion = () => {
    return <></>;
  };

  const activation = () => {
    return (
      <>
        <div className="flex flex-col items-center w-5/12 gap-2 px-8 py-12 bg-white rounded-lg">
          <img src={Alert} alt="illustration" width="100px" />
          <h4 className="text-lg font-semibold">
            Are you sure you want to activate?
          </h4>
          <div className="flex gap-3 mt-3">
            <button
              className="flex-1 px-10 py-1 text-white bg-C0D3E5A"
              onClick={toggleDeactivationModal}
            >
              No
            </button>
            <button
              className="flex-1 px-10 py-1 text-white bg-C1886C3"
              onClick={toggleDeactivationModal}
            >
              Yes
            </button>
          </div>
        </div>
      </>
    );
  };

  return ReactDOM.createPortal(
    <section
      className="fixed flex items-center justify-center w-full h-full bg-opacity-50 alertModal bg-CD9D9D9"
      id="deactivationModal"
    >
      {/* {showModal ? (
        <div className="flex flex-col items-center w-5/12 gap-2 px-8 py-12 bg-white rounded-lg">
          <img src={Choose} alt="illustration" width="100px" />
          <h4 className="text-lg font-semibold">Choose an action {childId}</h4>
          <div className="flex gap-3 mt-3">
            <button
              className="flex-1 px-10 py-1 text-white bg-C0D3E5A"
              onClick={() => {
                setShowModal(false);
                setShowCompletionModal(true);
              }}
            >
              Completed
            </button>
            <button
              className="flex-1 px-10 py-1 text-white bg-C1886C3"
              onClick={() => {
                setShowModal(false);
                setShowInactiveModal(true);
              }}
            >
              Inactive
            </button> */}
      {/* <button
              className="flex-1 px-10 py-1 text-white bg-C40BE04"
              onClick={()=> {
                setShowModal(false);
                setShowActiveModal(true);
              }}
            >
              Active
            </button>
          </div>
          <button
            className="w-full py-1 text-blue-800 bg-white border-2 border-blue-800"
            onClick={toggleDeactivationModal}
          >
            Cancel
          </button>
        </div>
      ) : null} */}
      {/* -------------------------- */}
      {status === "Active" ? (
        <div className="flex flex-col items-center w-5/12 gap-2 px-8 py-12 bg-white rounded-lg">
          <img src={Alert} alt="illustration" width="100px" />
          <h4 className="text-lg font-semibold">
            Are you sure you want to inactivate?
          </h4>
          <div className="flex gap-3 mt-3">
            <button
              className="flex-1 px-10 py-1 text-white bg-C0D3E5A"
              onClick={toggleDeactivationModal}
            >
              No
            </button>
            <button
              className="flex-1 px-10 py-1 text-white bg-C1886C3"
              onClick={() => handleUpdateStatus("Inactive")}
            >
              Yes
            </button>
          </div>
        </div>
      ) : null}

      {status === "Inactive" ? (
        <div className="flex flex-col items-center w-5/12 gap-2 px-8 py-12 bg-white rounded-lg">
          <img src={Alert} alt="illustration" width="100px" />
          <h4 className="text-lg font-semibold">
            Are you sure you want to activate?
          </h4>
          <div className="flex gap-3 mt-3">
            <button
              className="flex-1 px-10 py-1 text-white bg-C0D3E5A"
              onClick={toggleDeactivationModal}
            >
              No
            </button>
            <button
              className="flex-1 px-10 py-1 text-white bg-C1886C3"
              onClick={() => handleUpdateStatus("Active")}
            >
              Yes
            </button>
          </div>
        </div>
      ) : null}

      {/* -------------------------- */}

      {/* {showInactiveModal ? inactivation() : null} */}
      {/* {showCompletionModal ? (
        <div className="flex flex-col items-center w-5/12 gap-2 px-8 py-12 bg-white rounded-lg">
          <img src={Alert} alt="illustration" width="100px" />
          <h4 className="text-lg font-semibold">
            Are you sure you want to mark as complete?
          </h4>
          <div className="flex gap-3 mt-3">
            <button
              className="flex-1 px-10 py-1 text-white bg-C0D3E5A"
              onClick={toggleDeactivationModal}
            >
              No
            </button>
            <button
              className="flex-1 px-10 py-1 text-white bg-C1886C3"
              onClick={handleCompleteSubmition}
            >
              Yes
            </button>
          </div>
        </div>
      ) : null}
      {showActiveModal ? activation() : null} */}
    </section>,
    document.getElementById("deactivationModal")
  );
}

{
  /* <section
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
    </section>, */
}
