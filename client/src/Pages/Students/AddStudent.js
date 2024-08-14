import Axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./AddStudent.css";

function AddStudent() {
  const [sname, setSname] = useState("");
  const [usn, setUsn] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [branch, setBranch] = useState("");
  const [cgpa, setCgpa] = useState("");

  const baseUrl = "http://localhost:3001";

  const addstudent = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    Axios.post(`${baseUrl}/addstudents`, {
      sname: sname,
      usn: usn,
      mobile: mobile,
      email: email,
      dob: dob,
      branch: branch,
      cgpa: cgpa,
    }).then((response) => {
      if (response.data.err) {
        return toast("Some error", { type: "error" });
      } else {
        toast("Successfully Added", { type: "success" });
        // Clear the form
        setSname("");
        setUsn("");
        setMobile("");
        setEmail("");
        setDob("");
        setBranch("");
        setCgpa("");
      }
    });
  };

  return (
    <div className="add-placement-box">
      <ToastContainer position="bottom-center" />
      <h2>Add a Student</h2>
      <form onSubmit={addstudent}>
        <div className="add-placement-form">
          <input
            type="text"
            required
            value={sname}
            onChange={(e) => setSname(e.target.value)}
          />
          <label>Student Name</label>
        </div>
        <div className="add-placement-form">
          <input
            type="text"
            required
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
          />
          <label>USN</label>
        </div>
        <div className="add-placement-form">
          <input
            type="text"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <label>Phone</label>
        </div>
        <div className="add-placement-form">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div className="add-placement-form">
          <input
            type="text"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <label>DOB (YYYY-MM-DD)</label>
        </div>
        <div className="add-placement-form">
          <input
            type="text"
            required
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
          <label>Branch</label>
        </div>
        <div className="add-placement-form">
          <input
            type="text"
            required
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
          />
          <label>CGPA</label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddStudent;
