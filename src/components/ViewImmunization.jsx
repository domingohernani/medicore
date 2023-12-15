import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewImmunization() {
  const { childId } = useParams();

  const [childDetails, setChildDetails] = useState({});
  const [childVaccines, setChildVaccines] = useState();
  const [childRemark, setChildRemarks] = useState([]);

  const [BCGVaccine, setBCGVaccine] = useState([]);
  const [HepatitisBVaccine, setHepatitisBVaccine] = useState([]);
  const [Pentavalent, setPentavalent] = useState([]);
  const [OralPolioVaccine, setOralPolioVaccine] = useState([]);
  const [InactivatedPolio, setInactivatedPolio] = useState([]);
  const [PneumococcalConjugate, setPneumococcalConjugate] = useState([]);
  const [MeaslesMumpsRubella, setMeaslesMumpsRubella] = useState([]);

  const [BCGVaccineRemarks, setBCGVaccineRemarks] = useState([]);
  const [HepatitisBVaccineRemarks, setHepatitisBVaccineRemarks] = useState([]);
  const [PentavalentRemarks, setPentavalentRemarks] = useState([]);
  const [OralPolioVaccineRemarks, setOralPolioVaccineRemarks] = useState([]);
  const [InactivatedPolioRemarks, setInactivatedPolioRemarks] = useState([]);
  const [PneumococcalConjugateRemarks, setPneumococcalConjugateRemarks] =
    useState([]);
  const [MeaslesMumpsRubellaRemarks, setMeaslesMumpsRubellaRemarks] = useState(
    []
  );

  // For updating
  const [updateBCGVaccine1, setUpdateBCGVaccine1] = useState("");
  const [updateHepatitisBVaccine1, setUpdateHepatitisBVaccine1] = useState("");

  const [updatePentavalent1, setUpdatePentavalent1] = useState("");
  const [updatePentavalent2, setUpdatePentavalent2] = useState("");
  const [updatePentavalent3, setUpdatePentavalent3] = useState("");

  const [updateOralPolioVaccine1, setUpdateOralPolioVaccine1] = useState("");
  const [updateOralPolioVaccine2, setUpdateOralPolioVaccine2] = useState("");
  const [updateOralPolioVaccine3, setUpdateOralPolioVaccine3] = useState("");

  const [updateInactivatedPolio1, setUpdateInactivatedPolio1] = useState("");
  const [updateInactivatedPolio2, setUpdateInactivatedPolio2] = useState("");

  const [updatePneumococcalConjugate1, setUpdatePneumococcalConjugate1] =
    useState("");
  const [updatePneumococcalConjugate2, setUpdatePneumococcalConjugate2] =
    useState("");
  const [updatePneumococcalConjugate3, setUpdatePneumococcalConjugate3] =
    useState("");

  const [updateMeaslesMumpsRubella1, setUpdateMeaslesMumpsRubella1] =
    useState("");
  const [updateMeaslesMumpsRubella2, setUpdateMeaslesMumpsRubella2] =
    useState("");

  const triggerUpdate = async () => {
    console.log(updateBCGVaccine1);

    console.log(updateHepatitisBVaccine1);

    console.log(updatePentavalent1);
    console.log(updatePentavalent2);
    console.log(updatePentavalent3);

    console.log(updateOralPolioVaccine1);
    console.log(updateOralPolioVaccine2);
    console.log(updateOralPolioVaccine3);

    console.log(updateInactivatedPolio1);
    console.log(updateInactivatedPolio2);

    console.log(updatePneumococcalConjugate1);
    console.log(updatePneumococcalConjugate2);
    console.log(updatePneumococcalConjugate3);

    console.log(updateMeaslesMumpsRubella1);
    console.log(updateMeaslesMumpsRubella2);
    setUpdateButton(true);

    try {
      const response = await axios.put(
        `http://localhost:8800/updateImmunization/${childId}`,
        {
          updateBCGVaccine1,
        }
      );
      console.log(response);
    } catch (error) {}
  };

  // For updating

  const [updateButton, setUpdateButton] = useState(false);

  // Kinukuha yung mga children from the database
  useEffect(() => {
    const fetchAllChild = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/viewbmitracking/${childId}`
        );
        setChildDetails(response.data.childDetails[0]);
        // console.log(response.data.childDetails[0]);

        const response1 = await axios.get(
          `http://localhost:8800/getChildImmunization/${childId}`
        );

        console.log(response1.data.BCGVaccine);
        setBCGVaccine(response1.data.BCGVaccine);
        setHepatitisBVaccine(response1.data.HepatitisBVaccine);
        setPentavalent(response1.data.PentavalentVaccine);
        setOralPolioVaccine(response1.data.OralPolioVaccine);
        setInactivatedPolio(response1.data.InactivatedPolio);
        setPneumococcalConjugate(response1.data.PneumococcalConjugate);
        setMeaslesMumpsRubella(response1.data.MeaslesMumpsRubella);

        const response2 = await axios.get(
          `http://localhost:8800/showRemarks/${childId}`
        );

        setBCGVaccineRemarks(response2.data.BCGVaccine);
        setHepatitisBVaccineRemarks(response2.data.HepatitisBVaccine);
        setPentavalentRemarks(response2.data.PentavalentVaccine);
        setOralPolioVaccineRemarks(response2.data.OralPolioVaccine);
        setInactivatedPolioRemarks(response2.data.InactivatedPolio);
        setPneumococcalConjugateRemarks(response2.data.PneumococcalConjugate);
        setMeaslesMumpsRubellaRemarks(response2.data.MeaslesMumpsRubella);
        setChildRemarks(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllChild();
  }, []);

  return (
    <section className="">
      <h3 className="px-6 py-2 mb-3 font-semibold bg-white rounded-lg w-fit">
        Body Mass Index Tracking
      </h3>
      <div className="grid grid-cols-3 gap-2 p-4 mb-2 bg-white rounded-lg">
        <div>
          <span>
            Child name: <span className="font-bold">{childDetails.name}</span>
          </span>
        </div>
        <div>
          <span>
            Mother's name:{" "}
            <span className="font-bold">{childDetails.mother}</span>
          </span>
        </div>
        <div>
          <span>
            Health Center:{" "}
            <span className="font-bold">Cabaruan Health Center</span>
          </span>
        </div>
        <div>
          <span>
            Date of Birth:{" "}
            <span className="font-bold">{childDetails.date_of_birth}</span>
          </span>
        </div>
        <div>
          <span>
            Father's name:{" "}
            <span className="font-bold">{childDetails.father}</span>
          </span>
        </div>
        <div>
          <span>
            Barangay: <span className="font-bold">Cabaruan</span>
          </span>
        </div>
        <div>
          <span>
            Place of Birth:{" "}
            <span className="font-bold">{childDetails.place_of_birth}</span>
          </span>
        </div>
        <div>
          <span>
            Cellphone No.:{" "}
            <span className="font-bold">{childDetails.family_number}</span>
          </span>
        </div>
        <div>
          <span>
            Sex: <span className="font-bold">{childDetails.sex}</span>
          </span>
        </div>
        <div className="col-span-2">
          <span>
            Address: <span className="font-bold">{childDetails.address}</span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 p-4 text-sm font-semibold text-center bg-white rounded-md gap-x-4 gap-y-3 ">
        <div className="p-3 text-white rounded-md bg-C0D3E5A">Bakuna</div>
        <div className="p-3 text-white rounded-md bg-C0D3E5A">Doses</div>
        <div className="p-3 text-white rounded-md bg-C0D3E5A">
          Petsa ng bakuna MM/DD/YY
        </div>
        <div className="p-3 text-white rounded-md bg-C0D3E5A">Remarks</div>
        {/* ----- */}
        <div className="p-3 rounded-md bg-CD9D9D9">BCG Vaccine</div>
        <div className="p-3 rounded-md bg-CD9D9D9">1) At birth</div>
        <div className="rounded-md bg-CD9D9D9 border-2">
          {updateButton ? (
            <input
              type="date"
              className="rounded-md h-full w-full text-center"
              onChange={(e) => setUpdateBCGVaccine1(e.target.value)}
            />
          ) : (
            BCGVaccine.map((element) => {
              const date = new Date(element.date_administered);
              const formattedDate = date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
              // return <p>1) {formattedDate}</p>;
              return (
                <input
                  type="text"
                  value={formattedDate}
                  className="rounded-md h-full w-full text-center"
                />
              );
            })
          )}
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">
          {BCGVaccineRemarks.length === 1 ? "Vaccinated" : "On process"}
        </div>
        {/* ----- */}

        {/* ----- */}
        <div className="p-3 rounded-md bg-CD9D9D9 ">Hepatitis B Vaccine</div>
        <div className="p-3 rounded-md bg-CD9D9D9 ">1) At birth</div>
        <div className="rounded-md bg-CD9D9D9 border-2 ">
          {updateButton ? (
            <input
              type="date"
              className="rounded-md h-full w-full text-center"
              onChange={(e) => setUpdateHepatitisBVaccine1(e.target.value)}
            />
          ) : (
            HepatitisBVaccine.map((element) => {
              const date = new Date(element.date_administered);
              const formattedDate = date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
              // return <p>1) {formattedDate}</p>;
              return (
                <input
                  type="text"
                  value={formattedDate}
                  className="rounded-md h-full w-full text-center"
                />
              );
            })
          )}
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9 ">
          {HepatitisBVaccineRemarks.length === 1 ? "Vaccinated" : "On process"}
        </div>
        {/* ----- */}

        {/* ----- */}
        <div className="p-3 rounded-md bg-CD9D9D9">
          Pentavalent Vaccine (DPT-Hep B-HIB)
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">
          3) 1 1/2, 2 1/2, 3 1/2 months
        </div>
        <div className="rounded-md bg-CD9D9D9">
          <div className="flex flex-col text-sm rounded-md border-2">
            {updateButton ? (
              <>
                <input
                  type="date"
                  className="h-full w-full text-center"
                  onChange={(e) => setUpdatePentavalent1(e.target.value)}
                />
                <input
                  type="date"
                  className=" h-full w-full text-center"
                  onChange={(e) => setUpdatePentavalent2(e.target.value)}
                />
                <input
                  type="date"
                  className=" h-full w-full text-center"
                  onChange={(e) => setUpdatePentavalent3(e.target.value)}
                />
              </>
            ) : (
              Pentavalent.map((element, index) => {
                const date = new Date(element.date_administered);
                const formattedDate = date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
                // return <p>1) {formattedDate}</p>;
                return (
                  <input
                    type="text"
                    value={formattedDate}
                    className="h-full w-full text-center flex-1 py-1"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">
          {PneumococcalConjugateRemarks.length === 3
            ? "Vaccinated"
            : "On process"}
        </div>
        {/* ----- */}

        {/* ----- */}
        <div className="p-3 rounded-md bg-CD9D9D9">
          Oral Polio Vaccine (OPV)
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">
          3) 1 1/2, 2 1/2, 3 1/2 months
        </div>
        <div className=" rounded-md bg-CD9D9D9">
          <div className="flex text-sm flex-col rounded-md border-2">
            {updateButton ? (
              <>
                <input
                  type="date"
                  className="h-full w-full text-center"
                  onChange={(e) => setUpdateOralPolioVaccine1(e.target.value)}
                />
                <input
                  type="date"
                  className=" h-full w-full text-center"
                  onChange={(e) => setUpdateOralPolioVaccine2(e.target.value)}
                />
                <input
                  type="date"
                  className=" h-full w-full text-center"
                  onChange={(e) => setUpdateOralPolioVaccine3(e.target.value)}
                />
              </>
            ) : (
              OralPolioVaccine.map((element, index) => {
                const date = new Date(element.date_administered);
                const formattedDate = date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
                // return <p>1) {formattedDate}</p>;
                return (
                  <input
                    type="text"
                    value={formattedDate}
                    className="h-full w-full text-center flex-1 py-1"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">
          {OralPolioVaccineRemarks.length === 3 ? "Vaccinated" : "On process"}
        </div>
        {/* ----- */}

        {/* ----- */}
        <div className="p-3 rounded-md bg-CD9D9D9">
          Inactivated Polio Vaccine (PIV)
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">2) 3 1/2 & 9 months</div>
        <div className=" rounded-md bg-CD9D9D9">
          <div className="flex text-sm justify-center rounded-md border-2 ">
            {updateButton ? (
              <>
                <input
                  type="date"
                  className="h-full py-3 w-full text-center"
                  onChange={(e) => setUpdateInactivatedPolio1(e.target.value)}
                />
                <input
                  type="date"
                  className=" h-full py-3 w-full text-center"
                  onChange={(e) => setUpdateInactivatedPolio2(e.target.value)}
                />
              </>
            ) : (
              InactivatedPolio.map((element, index) => {
                const date = new Date(element.date_administered);
                const formattedDate = date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
                // return <p>1) {formattedDate}</p>;
                return (
                  <input
                    type="text"
                    value={formattedDate}
                    className="h-full w-full text-center flex-1 py-3"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">
          {InactivatedPolioRemarks.length === 2 ? "Vaccinated" : "On process"}
        </div>
        {/* ----- */}

        {/* ----- */}
        <div className="p-3 rounded-md bg-CD9D9D9">
          Pneumococcal Conjugate Vaccine (PCV)
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">
          3) 1 1/2, 2 1/2, 3 1/2 months
        </div>
        <div className=" rounded-md bg-CD9D9D9 border-2">
          <div className="flex text-sm flex-col">
            {updateButton ? (
              <>
                <input
                  type="date"
                  className="h-full w-full text-center"
                  onChange={(e) =>
                    setUpdatePneumococcalConjugate1(e.target.value)
                  }
                />
                <input
                  type="date"
                  className=" h-full w-full text-center"
                  onChange={(e) =>
                    setUpdatePneumococcalConjugate2(e.target.value)
                  }
                />
                <input
                  type="date"
                  className=" h-full  w-full text-center"
                  onChange={(e) =>
                    setUpdatePneumococcalConjugate3(e.target.value)
                  }
                />
              </>
            ) : (
              PneumococcalConjugate.map((element, index) => {
                const date = new Date(element.date_administered);
                const formattedDate = date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
                // return <p>1) {formattedDate}</p>;
                return (
                  <input
                    type="text"
                    value={formattedDate}
                    className="h-full w-full text-center flex-1 py-1"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">
          {PneumococcalConjugateRemarks.length === 3
            ? "Vaccinated"
            : "On process"}
        </div>
        {/* ----- */}

        {/* ----- */}
        <div className="p-3 rounded-md bg-CD9D9D9">
          Measles, Mumps, Rubella Vaccine (MMR)
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">2) 9 months & 1 year</div>
        <div className="rounded-md bg-CD9D9D9 border-2">
          <div className="flex text-sm">
            {updateButton ? (
              <>
                <input
                  type="date"
                  className="h-full py-5 w-full text-center"
                  onChange={(e) =>
                    setUpdateMeaslesMumpsRubella1(e.target.value)
                  }
                />
                <input
                  type="date"
                  className=" h-full py-5 w-full text-center"
                  onChange={(e) =>
                    setUpdateMeaslesMumpsRubella2(e.target.value)
                  }
                />
              </>
            ) : (
              MeaslesMumpsRubella.map((element, index) => {
                const date = new Date(element.date_administered);
                const formattedDate = date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
                // return <p>1) {formattedDate}</p>;
                return (
                  <input
                    type="text"
                    value={formattedDate}
                    className="h-full w-full text-center flex-1 py-6"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="p-3 rounded-md bg-CD9D9D9">
          {MeaslesMumpsRubellaRemarks.length === 2
            ? "Vaccinated"
            : "On process"}
        </div>
        {/* ----- */}
      </div>
      <div className="mx-auto flex justify-center items-center gap-3">
        <button className="text-white px-10" onClick={triggerUpdate}>
          Update
        </button>
        <button
          className="bg-C869EAC px-10"
          onClick={() => setUpdateButton(false)}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}

/*

<div className="flex flex-col w-3/12 gap-3 font-semibold text-center">
          <div className="w-full px-3 py-4 text-white bg-C0D3E5A ">Bakuna</div>
          <div className="w-full px-3 py-4 border-2 border-blue-950 text-blue-950 bg-C869EAC">
            BCG Vaccine
          </div>
          <div className="w-full px-3 py-4 border-2 border-blue-950 text-blue-950 bg-C869EAC">
            Hepatitis B Vaccine
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            Pentavalent Vaccine (DPT-Hep B-HIB)
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            Oral Polio Vaccine (OPV)
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            Inactivated Polio Vaccine (PIV)
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            Pneumococcal Conjugate Vaccine (PCV)
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            Measles, Mumps, Rubella Vaccine (MMR)
          </div>
        </div>

        <div className="flex flex-col w-3/12 gap-3 font-semibold text-center">
          <div className="w-full px-3 py-4 text-white bg-C0D3E5A ">Doses</div>
          <div className="w-full px-3 py-4 border-2 border-blue-950 text-blue-950 bg-C869EAC">
            1) At birth
          </div>
          <div className="w-full px-3 py-4 border-2 border-blue-950 text-blue-950 bg-C869EAC">
            1) At birth
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            3) 1 1/2, 2 1/2, 3 1/2 months
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            3) 1 1/2, 2 1/2, 3 1/2 months
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            2) 3 1/2 & 9 months
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            3) 1 1/2, 2 1/2, 3 1/2 months
          </div>
          <div className="w-full px-3 py-4 border-2 text-blue-950 border-blue-950 bg-C869EAC">
            2) 9 months & 1 year
          </div>
        </div>

*/
