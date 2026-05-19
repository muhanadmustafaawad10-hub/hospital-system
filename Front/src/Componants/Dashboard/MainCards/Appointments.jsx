import React from "react";

const Appointments = ({ allData }) => {
  return (
    <div className="onecard Appoint Doctor bg-white col-lg-6 pt-0 p-0">
      <h5 className=" pb-3 pt-3 ps-3 pe-3">Recent Appointments</h5>
      <div className="d-flex justify-content-between mb-2 ps-3 pe-3">
        <strong>Patient </strong>
        <strong>Doctor</strong>
        <strong>Date</strong>
        <strong>The Status</strong>
      </div>
      <ul className="p-0">
        {allData["Appointments"]?.map((ele, index) => {
          return (
            <li
              className={` ${index % 2 === 0 ? "active" : ""} ps-3 pe-3 d-flex p-2 align-items-center  justify-content-between`}
            >
              <p className="mb-0">{ele.patient}</p>
              <p className="mb-0">{ele.doctor}</p>
              <p className="mb-0">{ele.date}</p>
              <span className="confirmed mb-0 fw-semibold text-light">
                Confirmed
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Appointments;
