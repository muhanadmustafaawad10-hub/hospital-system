import axios from "axios";
import React, { useState } from "react";
import "./Register.css";
const Registing = ({ setRegister, setLogin, setAuth }) => {
  const [MsgEmail, setMsgEmail] = useState("");
  const [MsgPassword, setMsgPassword] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    adress: "",
    mobile: "",
  });
  const handleRegister = () => {
    if (
      input.name !== "" &&
      input.email !== "" &&
      input.password !== "" &&
      input.mobile !== "" &&
      input.adress !== ""
    ) {
      axios
        .post(`http://localhost:4000/Form/Register`, {
          data: input,
        })
        .then((res) => {
          console.log(res.data);
          if (typeof res.data === "object") {
            setAuth(false);
            setRegister(res.data.name);
          } else {
            setMsgEmail(res.data);
          }
        });
    }
  };

  const handleLogin = () => {
    if (
      input.name !== "" &&
      input.email !== "" &&
      input.password !== "" &&
      input.mobile !== "" &&
      input.adress !== ""
    ) {
      axios
        .post("http://localhost:4000/Form/Login", {
          data: input,
        })
        .then((res) => {
          console.log(res.data);

          if (typeof res.data === "object") {
            setAuth(false);
            setLogin(res.data.name);
          } else {
            setMsgPassword(res.data);
          }
        });
    }
  };
  return (
    <div className="register  d-flex justify-content-center align-items-center">
      <div className="d-flex theForm w-50 p-5 flex-column align-items-center gap-2 ">
        <h2 className="pb-3">Please Sign in</h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="d-flex w-75 flex-column gap-3"
        >
          <input
            required
            value={input.name}
            placeholder="Enter Your Name"
            className="w-100"
            type="text"
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />

          <input
            type="text"
            required
            value={input.mobile}
            placeholder="Enter your mobile phone"
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, mobile: e.target.value };
              })
            }
          />
          <input
            type="text"
            required
            value={input.adress}
            placeholder="Enter your Adress"
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, adress: e.target.value };
              })
            }
          />

          <input
            value={input.email}
            placeholder="Enter Your Email"
            required
            className="w-100"
            type="email"
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
          <input
            value={input.password}
            required
            placeholder="Enter Your Password"
            className="w-100"
            type="password"
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
          {MsgEmail.length > 0 ? <p className=" msg">{MsgEmail}</p> : ""}
          {MsgPassword.length > 0 ? <p className=" msg">{MsgPassword}</p> : ""}
          <div className="op mt-2 w-100 d-flex flex-column  align-items-center gap-2 text-center">
            {" "}
            <button
              type="submit"
              className="btnAdd w-75 text-center"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <button
              type="submit"
              className="btnAdd w-75 text-center"
              onClick={() => handleLogin()}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registing;
