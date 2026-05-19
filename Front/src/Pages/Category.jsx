import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Category.css";
import axios from "axios";
// Import Swiper React components

import DoctorSide from "./GlopalComponants/MainSide";
import AddSide from "./GlopalComponants/AddSide";
import MainSide from "./GlopalComponants/MainSide";
import { useLocation } from "react-router-dom";
import EditSide from "./GlopalComponants/EditSide";

const Category = ({
  setStatus,
  name,
  categories,
  formdata,
  setallData,
  allData,
}) => {
  const [status, setstatus] = useState(false);
  const [Editstatus, setEditstatus] = useState(false);
  const [DoctorsData, setDoctorsData] = useState({
    Name: "",
    Specialty: "",
    Phone: 0,
    Scedule: "",
  });
  const [PatientsData, setPatientsData] = useState({
    Name: "",
    Age: 0,
    Disease: "",
    Phone: 0,
  });
  const [AppointData, setAppointData] = useState({
    Patient: "",
    Doctor: 0,
    Date: "",
    Time: 0,
  });
  const [EditId, setId] = useState("");

  const location = useLocation();

  const Manage = () => {
    setstatus(true);
    document.querySelector(".DoctorList").style.zIndex = 0;
    setStatus(true);
  };
  const handle = () => {
    setstatus(false);
    setEditstatus(false);
    setStatus(false);
    document.querySelector(".DoctorList").style.zIndex = 1;
    if (name === "Doctors") {
      const states = allData["Doctors"].some(
        (i) => i.name === DoctorsData.Name,
      );
      if (!states) {
        axios
          .post("http://localhost:4000/Doctors", {
            data: DoctorsData,
          })
          .then((res) => getData());
      }
    }
    if (name === "Patients") {
      axios
        .post("http://localhost:4000/Patients", {
          data: PatientsData,
        })
        .then((res) => getData());
    }
    if (name === "Appointments") {
      const states = allData["Appointments"].some(
        (i) => i.doctor === AppointData.Doctor && i.date === AppointData.Date,
      );
      if (!states) {
        axios
          .post("http://localhost:4000/Appointments", {
            data: AppointData,
          })
          .then((res) => getData());
      }
    }
  };

  // const [allData, setallData] = useState({
  //   Doctors: [],
  //   Patients: [],
  //   Appointments: [],
  // });
  // const getData = () => {
  //   axios.get(`http://localhost:4000/${name}`).then((res) => {
  //     setallData((prev) => {
  //       return { ...prev, [name]: res.data };
  //     });
  //   });
  // };

  useEffect(() => {
    console.log(allData);
  }, [allData]);
  const getData = () => {
    axios.get(`http://localhost:4000/${name}`).then((res) => {
      setallData((prev) => {
        return { ...prev, [name]: res.data };
      });
    });
  };
  useEffect(() => {
    getData();
  }, [name]);

  return (
    <section className=" DashContainer d-flex justify-content-center align-items-center ">
      <MainSide
        Manage={Manage}
        name={name}
        categories={categories}
        allData={allData}
        getData={getData}
        setEditstatus={setEditstatus}
        setstatus={setstatus}
        EditId={EditId}
        setId={setId}
      />
      {status ? (
        <AddSide
          formdata={formdata}
          handle={handle}
          name={name}
          setDoctorsData={setDoctorsData}
          DoctorsData={DoctorsData}
          setPatientsData={setPatientsData}
          setAppointData={setAppointData}
          setStatus={setStatus}
          setstatus={setstatus}
        />
      ) : (
        ""
      )}

      {Editstatus ? (
        <EditSide
          formdata={formdata}
          handle={handle}
          name={name}
          setDoctorsData={setDoctorsData}
          DoctorsData={DoctorsData}
          setPatientsData={setPatientsData}
          setAppointData={setAppointData}
          setStatus={setStatus}
          Manage={Manage}
          setEditstatus={setEditstatus}
          setStatus={setStatus}
          EditId={EditId}
          setId={setId}
          PatientsData={PatientsData}
          AppointData={AppointData}
          setstatus={setstatus}
          getData={getData}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default Category;
