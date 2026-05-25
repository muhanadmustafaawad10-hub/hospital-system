import React, { useState } from "react";
import Topheader from "./Header/Topheader";
import "./Dash.css";
import { MdSpatialAudio } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { FaUserDoctor } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import Status from "./Status/Status";
import MainCards from "./MainCards/MainCards";

const Dash = ({ allData, RegisterName, LoginName, GetgeneralData }) => {
  const cards = [
    {
      title: "Total Patient",
      number: 325,
      logo1: <MdSpatialAudio />,
      logo2: <VscAccount />,
      color: " #6ea8dc",
      name: "Patients",
    },
    {
      title: "Total Doctors",
      number: 45,
      logo1: <FaUserDoctor />,
      logo2: <VscAccount />,
      color: "#e98a72",
      name: "Doctors",
    },
    {
      title: "Appointments Today",
      number: 18,
      logo1: <GrNotes />,
      logo2: <VscAccount />,
      color: "#84c8b5",
      name: "Appointments",
    },
  ];

  return (
    <div className="Dash   DashContainer mt-0">
      <Topheader RegisterName={RegisterName} LoginName={LoginName} />
      <Status allData={allData} cards={cards} />
      <MainCards allData={allData} GetgeneralData={GetgeneralData} />
    </div>
  );
};

export default Dash;
