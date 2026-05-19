import axios from "axios";
import React, { useEffect, useState } from "react";

const EditSide = ({
  handle,
  name,
  formdata,
  setDoctorsData,
  setAppointData,
  setPatientsData,
  setEditstatus,
  setStatus,
  EditId,
  DoctorsData,
  PatientsData,
  AppointData,
  getData,
  setstatus,
}) => {
  // const handleInput = (e) => {
  //   if (name === "Doctors") {
  //     setDoctorsData((prev) => {
  //       return { ...prev, [e.target.name]: e.target.value };
  //     });
  //   }
  //   if (name === "Patients") {
  //     setPatientsData((prev) => {
  //       return { ...prev, [e.target.name]: e.target.value };
  //     });
  //   }
  //   if (name === "Appointments") {
  //     setAppointData((prev) => {
  //       return { ...prev, [e.target.name]: e.target.value };
  //     });
  //   }
  // };
  // const handleAll = () => {
  //

  //   if (name === "Doctors") {
  //     axios
  //       .put(`http://localhost:4000/${name}?id=${EditId}`, {
  //         data: DoctorsData,
  //       })
  //       .then((res) => getData());
  //   }
  //   if (name === "Patients") {
  //     axios
  //       .put(`http://localhost:4000/${name}?id=${EditId}`, {
  //         data: PatientsData,
  //       })
  //       .then((res) => getData());
  //   }
  //   if (name === "Appointments") {
  //     axios
  //       .put(`http://localhost:4000/${name}?id=${EditId}`, {
  //         data: AppointData,
  //       })
  //       .then((res) => getData());
  //   }
  // };

  let stateValue = {};
  if (name === "Doctors") stateValue = DoctorsData;
  if (name === "Patients") stateValue = PatientsData;
  if (name === "Appointments") stateValue = AppointData;

  const handleCancel = () => {
    setstatus(false);
    setEditstatus(false);
    setStatus(false);
  };
  const GetEditData = (id) => {
    axios.get(`http://localhost:4000/${name}/Edit?id=${id}`).then((res) => {
      console.log(res.data);
      if (name === "Doctors") {
        setDoctorsData({
          Name: res.data.name,
          Specialty: res.data.spec,
          Phone: res.data.phone,
          Scedule: res.data.scedule,
        });
      }
      if (name === "Patients") {
        setPatientsData({
          Name: res.data.name,
          Age: res.data.age,
          Disease: res.data.disease,
          Phone: res.data.phone,
        });
      }
      if (name === "Appointments") {
        setAppointData({
          Patient: res.data.patient,
          Doctor: res.data.doctor,
          Date: res.data.date,
          Time: res.data.time,
        });
      }
    });
  };

  const handleTyping = (e) => {
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

  const handleChanges = (id) => {
    setstatus(false);
    setEditstatus(false);
    setStatus(false);
    if (name === "Doctors") {
      axios
        .put(`http://localhost:4000/${name}?id=${id}`, {
          data: DoctorsData,
        })
        .then((res) => {
          console.log(res.data);
          getData();
        });
    }

    if (name === "Patients") {
      axios
        .put(`http://localhost:4000/${name}?id=${id}`, {
          data: PatientsData,
        })
        .then((res) => {
          console.log(res.data);
          getData();
        });
    }
    if (name === "Appointments") {
      axios
        .put(`http://localhost:4000/${name}?id=${id}`, {
          data: AppointData,
        })
        .then((res) => {
          console.log(res.data);
          getData();
        });
    }
  };

  useEffect(() => {
    GetEditData(EditId);
  }, []);

  return (
    <div className="addDoctors container p-3">
      <h2 className="mb-3">Edit {name}</h2>
      <form className="pt-4 ">
        {formdata.map((ele, index) => {
          return (
            <div className="d-flex justify-content-between pb-3">
              {" "}
              <label>{ele}:</label>
              <input
                name={ele}
                className="w-75"
                type="text"
                value={stateValue[ele]}
                onChange={(e) => handleTyping(e)}
              />
            </div>
          );
        })}
      </form>
      <div className="save d-flex gap-2 justify-content-end align-items-center pt-3">
        <div className="btnAdd" onClick={() => handleChanges(EditId)}>
          Save
        </div>
        <div className="btnAdd" onClick={() => handleCancel()}>
          cancel
        </div>
      </div>
    </div>
  );
};

export default EditSide;
