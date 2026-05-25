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
import toast from "react-hot-toast";
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
          .then((res) => {
            getData();
            toast.success(
              <p className="toaster">
                Dr. <span className="toasting">{res.data.name} </span> added
                successfully
              </p>,
            );
          });
      } else {
        toast.error(`A doctor with the same name already exists.`);
      }
    }
    if (name === "Patients") {
      axios
        .post("http://localhost:4000/Patients", {
          data: PatientsData,
        })
        .then((res) => {
          getData();
          toast.success(
            <p className="toaster">
              Patient <span className="toasting">{res.data.name} </span> added
              successfully
            </p>,
          );
        });
    }
    if (name === "Appointments") {
      const states = allData["Appointments"].some(
        (i) =>
          i.doctor === AppointData.Doctor &&
          i.date === AppointData.Date &&
          i.time.toLowerCase() === AppointData.Time.toLowerCase(),
      );

      const DoctorScedule = DoctorTemp.find(
        (i) => i.name === AppointData.Doctor,
      ).scedule;

      const AppointScedule = AppointData.Time;

      const [period1, period2] = DoctorScedule.split("-");
      const resultPeriod1 = period1
        .match(/(\d+(?:\.\d+)?)(am|pm)/i)
        .slice(1, 3)
        .map((ele, index) => (index === 0 ? Number(ele) : ele));

      const resultPeriod2 = period2
        .match(/(\d+(?:\.\d+)?)(am|pm)/i)
        .slice(1, 3)
        .map((ele, index) => (index === 0 ? Number(ele) : ele));

      const resultPeriod3 = AppointScedule.match(/(\d+(?:\.\d+)?)(am|pm)/i)
        .slice(1, 3)
        .map((ele, index) => (index === 0 ? Number(ele) : ele));

      const a = handleTime(resultPeriod1[0], resultPeriod1[1]);
      const b = handleTime(resultPeriod2[0], resultPeriod2[1]);
      const c = handleTime(resultPeriod3[0], resultPeriod3[1]);

      let periodState = false;

      if (a < b) {
        if (c >= a && c < b) {
          periodState = true;
        } else {
          periodState = false;
        }
      } else {
        if (c >= a || c < b) {
          periodState = true;
        } else {
          periodState = false;
        }
      }

      if (states === false && periodState === true) {
        axios
          .post("http://localhost:4000/Appointments", {
            data: AppointData,
          })
          .then((res) => {
            getData();
            toast.success(
              <p className="toaster">
                Appointment booked successfully with Dr.{" "}
                <span className="toasting">{res.data.doctor} </span>
              </p>,
            );
          });
      } else {
        if (states === true) {
          toast.error(
            `An appointment for this doctor already exists on the same date.`,
          );
        } else if (periodState === false) {
          toast.error(
            `The selected time is outside the doctor's working schedule.`,
          );
        }
      }
    }
  };

  const handleTime = (v1, v2) => {
    const period = v2.toLowerCase();
    if (period === "am" && v1 === 12) {
      v1 = 0;
      return v1;
    }
    if (period === "pm" && v1 !== 12) {
      v1 += 12;
      return v1;
    }

    return v1;
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

  const [DoctorTemp, setDoctorTemp] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/Doctors`).then((res) => {
      setDoctorTemp(res.data);
    });
  }, [location]);

  useEffect(() => {
    console.log(allData);
  }, [allData]);
  const getData = () => {
    axios.get(`http://localhost:4000/${name}`).then((res) => {
      setallData((prev) => {
        return { ...prev, [name]: res.data };
      });
    });
    document.querySelector(".DoctorList").style.zIndex = 1;
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
        setStatus={setStatus}
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
