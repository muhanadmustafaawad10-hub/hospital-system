import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Componants/Navbar/Navbar";
import Dash from "./Componants/Dashboard/Dash";
import { Route, Routes, useLocation } from "react-router-dom";
import Doctors from "./Pages/Category";
import { useEffect, useState } from "react";
import Category from "./Pages/Category";
import axios from "axios";
import Registing from "./Componants/Registing";
import Contact from "./Pages/Contact";
import Nurce from "./Componants/Nurce";
import { FaList } from "react-icons/fa";
import Details from "./Pages/Details";
import AllDetails from "./Pages/AllDetails";

function App() {
  const [Auth, setAuth] = useState(true);
  const [RegisterName, setRegister] = useState("");
  const [LoginName, setLogin] = useState("");
  const [Toggle, setToggle] = useState(false);

  const options = [
    { name: "Doctors", path: "/Doctors" },
    { name: "Patients", path: "/Patients" },
    {
      name: "Appointments",
      path: "/Appointments",
    },
    { name: "Contact", path: "/Contact" },
    { name: "Settings", path: "/Settings" },
  ];
  const categoriesDoctors = ["Name", "Specality", "phone", "scedule", "Action"];
  const categoriesPatients = ["Name", "Age", "Disease", "Phone", "Action"];
  const categoriesAppoint = ["Patients", "Doctors", "Date", "Time", "Status"];
  const FormAppoint = ["Patient", "Doctor", "Date", "Time"];
  const FormDoctors = ["Name", "Specialty", "Phone", "Scedule"];
  const FormPatients = ["Name", "Age", "Disease", "Phone"];
  const StatusData = ["Doctors", "Patients", "Appointments"];
  const location = useLocation();
  const [Status, setStatus] = useState(false);
  const [allData, setallData] = useState({
    Doctors: [],
    Patients: [],
    Appointments: [],
  });
  const [a, seta] = useState(false);
  const [GeneralData, setGeneralData] = useState({});

  const GetgeneralData = () => {
    const allpromises = StatusData.map((ele, index) => {
      return axios.get(`http://localhost:4000/${ele}`).then((res) => {
        return { [ele]: res.data };
      });
    });

    Promise.all(allpromises).then((res) => {
      const result = res.reduce((curr, acc) => {
        return { ...curr, ...acc };
      });
      console.log(result);

      setGeneralData(result);
    });
  };

  useEffect(() => {
    setToggle(false);
    options
      .filter((i) => i.name !== "Contact")
      .forEach((ele) => {
        if (location.pathname === ele.path) setStatus(true);
      });

    GetgeneralData();
    seta(true);
  }, [location]);

  useEffect(() => {
    if (a) {
      const smailar = GeneralData["Doctors"]?.map((ele) => {
        const value = GeneralData["Appointments"].some(
          (i) => i.doctor === ele.name,
        );
        return { ...ele, status: value };
      });
      axios
        .put(`http://localhost:4000/Doctors/status`, {
          data: smailar,
        })
        .then((res) => {
          GetgeneralData();
          seta(false);
        });
    }
  }, [GeneralData]);

  //   if (!GeneralData.Doctors || !GeneralData.Appointments) return;

  //   const updatedDoctors = GeneralData.Doctors.map((doctor) => {
  //     const active = GeneralData.Appointments.some(
  //       (a) => a.doctor === doctor.name,
  //     );

  //     return { ...doctor, status: active };
  //   });

  //   axios
  //     .put("http://localhost:4000/Doctors/status", {
  //       data: updatedDoctors,
  //     })
  //     .then(() => {
  //       // 👇 هنا المهم
  //       setGeneralData((prev) => ({
  //         ...prev,
  //         Doctors: updatedDoctors,
  //       }));
  //     });
  // }, [GeneralData.Appointments]);

  {
    return Auth ? (
      <Registing
        setAuth={setAuth}
        setLogin={setLogin}
        setRegister={setRegister}
      />
    ) : (
      <div className="">
        <Navbar Toggle={Toggle} setToggle={setToggle} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Dash
                  LoginName={LoginName}
                  RegisterName={RegisterName}
                  allData={GeneralData}
                  GetgeneralData={GetgeneralData}
                />
              </>
            }
          />
          <Route path="/Dashboard" element={<Dash allData={GeneralData} />} />
          <Route
            path="/Doctors"
            element={
              <Category
                name="Doctors"
                categories={categoriesDoctors}
                setStatus={setStatus}
                formdata={FormDoctors}
                allData={allData}
                setallData={setallData}
              />
            }
          />
          <Route
            path="/Patients"
            element={
              <Category
                name="Patients"
                categories={categoriesPatients}
                setStatus={setStatus}
                formdata={FormPatients}
                allData={allData}
                setallData={setallData}
              />
            }
          />
          <Route
            path="/Appointments"
            element={
              <Category
                name="Appointments"
                categories={categoriesAppoint}
                setStatus={setStatus}
                formdata={FormAppoint}
                allData={allData}
                setallData={setallData}
              />
            }
          />
          <Route path="/Contact" element={<Contact />} />
          <Route
            path="/Details/:name/:id"
            element={<Details setStatus={setStatus} />}
          />
          <Route
            path="/AllDetails/:name"
            element={<AllDetails setStatus={setStatus} />}
          />
        </Routes>
        {Status ? (
          <div className="overlay" onClick={() => setStatus(false)}></div>
        ) : (
          ""
        )}
        <div className="opening" onClick={() => setToggle(true)}>
          <FaList />
        </div>
      </div>
    );
  }
}

export default App;
