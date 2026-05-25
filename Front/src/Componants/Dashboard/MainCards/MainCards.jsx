import React, { useState } from "react";
import "./MainCards.css";
import GraphCard from "./GraphCard";
import axios from "axios";
import Doctors from "./Doctors";
import Appointments from "./Appointments";
import Patients from "./Patients";
import toast from "react-hot-toast";

const MainCards = ({ allData, GetgeneralData }) => {
  const PatientsKeys = ["Name", "Age", "Disease", "Phone"];

  const [PatientsState, setPatientState] = useState({
    Name: "",
    Age: "",
    Disease: "",
    Phone: "",
  });

  const handlePatients = (e) => {
    setPatientState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const SavePatientData = () => {
    axios
      .post("http://localhost:4000/Patients", {
        data: PatientsState,
      })
      .then((res) => {
        setPatientState({ Name: "", Age: "", Disease: "", Phone: "" });
        GetgeneralData();

        toast.success(
          <p className="toaster">
            Patient <span className="toasting">{res.data.name}</span> added
            successfully
          </p>,
        );
      });
  };
  return (
    <div className="mainCards mt-4 container  d-flex flex-column gap-3">
      <div className="row gap-3 justify-content-center">
        <Appointments allData={allData} />
        <GraphCard allData={allData} />
      </div>
      <div className="row gap-3 justify-content-center mb-4">
        <Doctors allData={allData} />
        <Patients
          PatientsState={PatientsState}
          handlePatients={handlePatients}
          PatientsKeys={PatientsKeys}
          SavePatientData={SavePatientData}
        />
      </div>
    </div>
  );
};

export default MainCards;
