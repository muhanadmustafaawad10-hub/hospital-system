import React from "react";

const Patients = ({
  PatientsKeys,
  PatientsState,
  handlePatients,
  SavePatientData,
}) => {
  return (
    <div className="theSecond adding bg-white pt-0 p-0 pb-3 col-lg-5">
      <h5 className="active pb-3 pt-3  ps-3 pe-3">Add New Patient</h5>
      <form
        className="pb-5 pt-3 ps-3 pe-3 mainOpretion w-100"
        onSubmit={(e) => e.preventDefault()}
      >
        {PatientsKeys.map((ele, index) => {
          return (
            <div className="oneOpretaion d-flex justify-content-between align-items-center">
              <p className="fw-semibold">{ele}:</p>
              <input
                value={PatientsState[ele]}
                name={ele}
                type="text"
                onChange={(e) => handlePatients(e)}
              />
            </div>
          );
        })}

        <button
          className="text-light btnAdd"
          onClick={() => {
            SavePatientData();
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Patients;
