import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const MainSide = ({
  Manage,
  name,
  categories,
  allData,
  getData,
  setEditstatus,
  setStatus,
  setstatus,
  setId,
}) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}"> ${index + 1}</span>`;
    },
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/${name}?id=${id}`).then((res) => {
      console.log(res);
      getData();
      if (name === "Doctors") {
        toast.error(`Doctor deleted successfully`);
      }
      if (name === "Patients") {
        toast.error(`Patient deleted successfully`);
      }
      if (name === "Appointments") {
        toast.error(`Appointment deleted successfully`);
      }
    });
  };

  const handleEdit = (id) => {
    console.log("Clicked:", id);
    setEditstatus(true);
    // document.querySelector(".DoctorList").style.zIndex = 0;
    // setStatus(true);
    setstatus(true);
    document.querySelector(".DoctorList").style.zIndex = 0;
    setStatus(true);
    // setstatus(true);
    // document.querySelector(".DoctorList").style.zIndex = 0;
    // setStatus(true);
    setId(id);
  };

  const [inputValue, setinputValue] = useState("");
  const [SearchData, setSearchData] = useState([]);
  useEffect(() => {
    if (inputValue !== "") {
      axios
        .get(`http://localhost:4000/${name}/Search?q=${inputValue}`)
        .then((res) => {
          console.log(res.data);
          setSearchData(res.data);
        });
    } else {
      setSearchData([]);
    }
  }, [inputValue]);
  const Navigate = useNavigate();

  const handleSubmition = (e) => {
    e.preventDefault();
    Navigate(`/AllDetails/${name}?q=${inputValue}`);
  };

  return (
    <div className="DoctorList   pt-3  bg-white container">
      <h3>{name} List</h3>
      <div className="addDoctor pt-3 pb-3 d-flex justify-content-between">
        <div
          className="btnAdd  d-flex align-items-center gap-1 fw-bold"
          onClick={() => Manage()}
        >
          <span> Add {name} </span> <span>+</span>
        </div>
        <form
          onSubmit={(e) => handleSubmition(e)}
          className="d-flex  justify-content-center align-items-center"
          action=""
        >
          <input
            value={inputValue}
            className="p-1 w-75"
            type="text"
            placeholder="Search by name"
            onChange={(e) => setinputValue(e.target.value)}
          />
          <button type="submit" className="p-1">
            <FaSearch />
          </button>
          {inputValue !== "" ? (
            <div>
              <ul className="m-0 p-2">
                {inputValue !== ""
                  ? SearchData.map((ele) => {
                      return (
                        <Link to={`/Details/${name}/${ele._id}`}>
                          <li className="pb-1 pt-1">
                            {ele.name || ele.patient}
                          </li>
                        </Link>
                      );
                    })
                  : ""}
              </ul>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
      <div className="content ">
        <ul className="d-flex justify-content-between p-0 m-0 mb-2 mt-3 mainList">
          {categories.map((ele, index) => {
            return <li key={index}>{ele}</li>;
          })}
        </ul>
        <div className="elements">
          {" "}
          <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper pb-5"
          >
            <SwiperSlide>
              <div className="a">
                {" "}
                {allData[name].slice(0, 6).map((ele, index) => {
                  return (
                    <ul className=" d-flex justify-content-between p-0 m-0 pt-2 pb-2 seconderyList">
                      {/* <li>{ele.name}</li>
                    <li>{ele.spec}</li>
                    <li>{ele.phone}</li>
                    <li>{ele.scedule}</li> */}
                      {Object.keys(ele)
                        .slice(1, 5)
                        .map((el, index) => {
                          return <li key={el}>{ele[el]}</li>;
                        })}
                      <li className="d-flex gap-2 EditDelete">
                        <div
                          className="btnAdd fw-6"
                          onClick={() => handleEdit(ele._id)}
                        >
                          Edit
                        </div>
                        <div
                          className="btnAdd deleting fw-6"
                          onClick={() => handleDelete(ele._id)}
                        >
                          Delete
                        </div>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="a">
                {" "}
                {allData[name].slice(6).map((ele, index) => {
                  return (
                    <ul className="d-flex justify-content-between p-0 m-0 pt-2 pb-2 seconderyList">
                      {/* <li>{ele.name}</li>
                    <li>{ele.spec}</li>
                    <li>{ele.phone}</li>
                    <li>{ele.scedule}</li> */}
                      {Object.keys(ele)
                        .slice(1, 5)
                        .map((el, index) => {
                          return <li key={el}>{ele[el]}</li>;
                        })}
                      <li className="d-flex gap-2">
                        <div
                          className="btnAdd fw-6"
                          onClick={() => handleEdit(ele._id)}
                        >
                          Edit
                        </div>
                        <div
                          className="btnAdd deleting fw-6"
                          onClick={() => handleDelete(ele._id)}
                        >
                          Delete
                        </div>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MainSide;
