import React from "react";

const Doctors = ({ allData }) => {
  //   {
  //     allData["Doctors"]?.forEach((ele, index) => {
  //       const a = allData["Appointments"]?.find(
  //         (element) => element.doctor === ele.name,
  //       );
  //       console.log(a);
  //     });
  //   }

  return (
    <div className="onecard doctorcard bg-white col-lg-6 pt-0 p-0">
      <h5 className="activee pb-3 pt-3 ps-3 pe-3">Doctor List</h5>
      <div className="d-flex justify-content-between mb-2 ps-3 pe-3">
        <strong>Name </strong>
        <strong>Speacilty</strong>
        <strong>The Status</strong>
      </div>
      <ul className="p-0  ">
        {allData["Doctors"]?.map((ele) => {
          return (
            <li
              className={`${ele.status ? "active" : ""} p-2 ps-3 pe-3  d-flex align-items-center  justify-content-between`}
            >
              <p className="mb-0">{ele.name}</p>
              <p className="mb-0">{ele.spec}</p>
              <span
                className={`pending text-light mb-0 ${ele.status === true ? "active" : ""}`}
              >
                {ele.status ? "Booked" : "Available"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Doctors;
