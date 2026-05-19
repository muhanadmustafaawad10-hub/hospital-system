import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./AllDetails.css";
const AllDetails = ({ setStatus }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const { name } = useParams();
  console.log(name);
  console.log(query);
  const [allDetails, setallDetails] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/${name}/Search?q=${query}`).then((res) => {
      console.log(res.data);
      setallDetails(res.data);
    });
    // setStatus(false);
  }, [name, query]);

  return (
    <div className="DashContainer AllDetails d-flex justify-content-center align-items-center">
      <div className="theDetails   w-75 ">
        <ul className="heads d-flex justify-content-between p-3 m-0">
          {Object.keys(allDetails[0] || {})
            .slice(1, 6)
            .map((ele) => {
              return <li>{ele}</li>;
            })}
        </ul>
        <div className="headstates ">
          {" "}
          {allDetails.map((ele) => {
            return (
              <ul className=" d-flex justify-content-between ps-3 pe-3 m-0 align-items-center">
                {Object.keys(ele)
                  .slice(1, 6)
                  .map((el) => {
                    return (
                      <li>
                        {typeof ele[el] !== "boolean" ? (
                          ele[el]
                        ) : ele[el] === true ? (
                          <div className="booked">booked</div>
                        ) : (
                          <div className="Available">Available</div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllDetails;
