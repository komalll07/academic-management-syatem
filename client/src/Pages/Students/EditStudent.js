import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

function EditStudent({ student, onClose, refreshList }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    sname: "",
    usn: "",
    mobile: "",
    email: "",
    dob: "",
    branch: "",
    cgpa: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        sname: student.sname,
        usn: student.usn,
        mobile: student.mobile,
        email: student.email,
        dob: student.dob.substring(0, 10),
        branch: student.branch,
        cgpa: student.cgpa,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:3001/students/${student.usn}`, formData)
      .then((response) => {
        console.log("Student updated successfully");
        refreshList();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <div className={classes.paper}>
      <h2>Edit Student</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          name="sname"
          label="Student Name"
          value={formData.sname}
          onChange={handleChange}
        />
        <TextField
          name="usn"
          label="USN"
          value={formData.usn}
          onChange={handleChange}
          disabled
        />
        <TextField
          name="mobile"
          label="Phone"
          value={formData.mobile}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="dob"
          label="DOB"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="branch"
          label="Branch"
          value={formData.branch}
          onChange={handleChange}
        />
        <TextField
          name="cgpa"
          label="CGPA"
          value={formData.cgpa}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Student
        </Button>
      </form>
    </div>
  );
}

export default EditStudent;