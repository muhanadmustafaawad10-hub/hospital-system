import "./Contact.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_qlp8qan", "template_9di178s", form.current, {
        publicKey: "vZCD7bP7wai7ZHdnT",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
    e.target.reset();
  };
  return (
    <div className="DashContainer Contact d-flex justify-content-center align-items-center">
      <form
        ref={form}
        onSubmit={(e) => sendEmail(e)}
        className="contactUs w-50 text-center p-4"
      >
        <h2>Contact Us</h2>
        <div className="d-flex flex-column gap-3 mb-3 mt-4">
          {" "}
          <input placeholder="Enter Your Name" name="name" type="text" />
          <input
            placeholder="Enter Your Email"
            name="email"
            type="email"
            required
          />
          <textarea
            placeholder="Enter Your Message"
            rows={10}
            name="msg"
            id=""
          ></textarea>
        </div>
        <button className="w-75 btnAdd" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
