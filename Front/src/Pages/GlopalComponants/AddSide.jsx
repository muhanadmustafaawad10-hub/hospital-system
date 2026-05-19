import React from "react";

const AddSide = ({
  handle,
  name,
  formdata,
  setDoctorsData,
  setAppointData,
  setPatientsData,
  setStatus,
  setstatus,
}) => {
  const handleInput = (e) => {
    if (name === "Doctors") {
      setDoctorsData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
    if (name === "Patients") {
      setPatientsData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
    if (name === "Appointments") {
      setAppointData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  return (
    <div className="addDoctors container p-3">
      <h2 className="mb-3">Add {name}</h2>
      <form
        className="pt-4 "
        onSubmit={(e) => {
          e.preventDefault();
          handle();
        }}
      >
        {formdata.map((ele, index) => {
          return (
            <div className="d-flex justify-content-between pb-3">
              {" "}
              <label>{ele}:</label>
              <input
                required
                name={ele}
                className="w-75"
                type="text"
                onChange={(e) => handleInput(e)}
              />
            </div>
          );
        })}
        <div className="save d-flex gap-2 justify-content-end align-items-center pt-3">
          <button type="submit" className="btnAdd">
            Save
          </button>
          <button
            className="btnAdd"
            onClick={() => {
              setstatus(false);
              setStatus(false);
              document.querySelector(".DoctorList").style.zIndex = 1;
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSide;
