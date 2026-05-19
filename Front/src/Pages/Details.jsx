import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
const Details = ({ setStatus }) => {
  const [element, setelement] = useState({});
  const { name, id } = useParams();
  console.log(name);
  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:4000/${name}/${id}`).then((res) => {
      console.log(res.data);
      setelement(res.data);
    });
    // setStatus(false);
  }, [name, id]);

  return (
    <div className="DashContainer Details  d-flex justify-content-center align-items-center  ">
      <div className="scedule w-50   m-0">
        {" "}
        <h2 className="p-2">Personal Details</h2>
        <ul className="p-0 m-0">
          {Object.keys(element)
            .slice(1, 6)
            .map((ele) => {
              return (
                <li className="d-flex align-items-center gap-2 p-2">
                  <strong className="p-0 m-0">{ele}: </strong>
                  <p className="p-0 m-0">
                    {typeof element[ele] !== "boolean" ? (
                      element[ele]
                    ) : element[ele] === true ? (
                      <div className="booked">Booked</div>
                    ) : (
                      <div className="Available">Available</div>
                    )}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Details;
