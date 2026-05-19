import React from "react";
import "./Status.css";
const Status = ({ cards, allData }) => {
  return (
    <div className="status  container mt-4 ">
      <div className="row justify-content-center gap-4">
        {cards.map((ele, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: `${ele.color}` }}
              className="thecard gap-3 p-2 col-lg-3 d-flex align-items-center  justify-content-between"
            >
              <span style={{ fill: ele.color }}>{ele.logo1}</span>
              <div className="conetent">
                <p className="m-0 ">{ele.title}</p>
                <h4> {allData[ele.name]?.length}</h4>
              </div>
              <span style={{ fill: ele.color }}>{ele.logo2}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Status;
