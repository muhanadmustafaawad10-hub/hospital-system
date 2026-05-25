import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa";
import "./header.css";
const Topheader = ({ RegisterName, LoginName }) => {
  const [Toggle, setToggle] = useState(false);
  return (
    <div className="d-flex pt-3 container  justify-content-between">
      <form
        className="form d-flex justify-content-center"
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <input type="text" className="ps-2" placeholder="Search" />
        <button className="ps-3 pe-3">
          <FaSearch />
        </button>
      </form>
      <div className="login  ">
        <div
          className="d-flex
      gap-3  align-items-center justify-content-center"
        >
          {" "}
          <span>
            <IoNotifications />
          </span>
          <span onClick={() => setToggle(!Toggle)}>
            <CgProfile />
          </span>
          <span>
            <FaAngleDown />
          </span>
        </div>
        <div className={`userName ${Toggle ? "active" : ""}`}>
          {" "}
          <span>
            <strong>User Name:</strong>
            <span> {RegisterName || LoginName}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topheader;
