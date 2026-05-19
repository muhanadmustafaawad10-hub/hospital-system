import React from "react";
import "./Navbar.css";
import { MdLocalHospital, MdOutlineSpatialAudioOff } from "react-icons/md";
import { FaHome, FaExternalLinkSquareAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";

const options = [
  { name: "Dashboard", path: "/", logo: <FaHome /> },
  { name: "Doctors", path: "/Doctors", logo: <FaUserDoctor /> },
  { name: "Patients", path: "/Patients", logo: <MdOutlineSpatialAudioOff /> },
  {
    name: "Appointments",
    path: "/Appointments",
    logo: <BsCalendar2DateFill />,
  },
  { name: "Contact", path: "/Contact", logo: <FaExternalLinkSquareAlt /> },
  // { name: "Settings", path: "/Settings", logo: <IoMdSettings /> },
];

const Navbar = ({ Toggle, setToggle }) => {
  const location = useLocation();

  return (
    <div className={`Nav p-3 text-white ${Toggle ? "active" : ""}`}>
      <strong onClick={() => setToggle(false)}>
        <CiCircleRemove />
      </strong>
      <div className="d-flex gap-2 align-items-center logo">
        <span>
          <MdLocalHospital />
        </span>
        <h5 className="m-0 p-0 fw-bold">Hospital System</h5>
      </div>

      <ul className="mt-5 p-0">
        {options.map((ele, index) => {
          return (
            <Link to={ele.path} key={index}>
              <li
                className={`d-flex align-items-center gap-3 mb-3 ${
                  location.pathname === ele.path ? "active" : ""
                }`}
              >
                <span>{ele.logo}</span>
                <p className="m-0">{ele.name}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
