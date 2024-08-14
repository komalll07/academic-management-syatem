const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const db = require("./config/db");

app.use(cors());
app.use(express.json());

const PORT = 3001;
app.listen(process.env.PORT || PORT, () => {
  console.log(`hurrayy , server running on port ${PORT}`);
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM studentdetails", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/companies", (req, res) => {
  db.query("SELECT * FROM companydetails", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/placements", (req, res) => {
  db.query("SELECT * FROM updateddrive", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/register", (req, res) => {
  const usn = req.body.usn;
  const pass = req.body.pass;

  db.query(
    "INSERT INTO slogin (usn,pass) VALUES (?,?)",
    [usn, pass],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
        return;
      }
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "already exists" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const usn = req.body.usn;
  const pass = req.body.pass;

  db.query(
    "SELECT * FROM slogin WHERE usn = ? AND pass = ?",
    [usn, pass],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination" });
      }
    }
  );
});

app.post("/admin", (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  db.query(
    "SELECT * FROM alogin WHERE email = ? AND pass = ?",
    [email, pass],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination" });
      }
    }
  );
});

app.post("/addcompany", (req, res) => {
  const { cname, cdescription, email, phone, website, adrs, package, mincgpa, position } = req.body;

  db.query(
    "INSERT INTO companydetails (cname,cdescription,email,phone,website,adrs,package,mincgpa,position) VALUES (?,?,?,?,?,?,?,?,?)",
    [cname, cdescription, email, phone, website, adrs, package, mincgpa, position],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "already exists" });
      }
    }
  );
});

app.post("/addplacement", (req, res) => {
  const { sname, usn, batch, cname, pdate, package, position } = req.body;

  db.query(
    "INSERT INTO updateddrive (sname,usn,batch,cname,pdate,package,position) VALUES (?,?,?,?,?,?,?)",
    [sname, usn, batch, cname, pdate, package, position],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "already exists" });
      }
    }
  );
});

app.post("/addstudents", (req, res) => {
  const { sname, usn, mobile, email, dob, branch, cgpa } = req.body;

  db.query(
    "INSERT INTO studentdetails (sname,usn,mobile,email,dob,branch,cgpa) VALUES (?,?,?,?,?,?,?)",
    [sname, usn, mobile, email, dob, branch, cgpa],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "already exists" });
      }
    }
  );
});

app.get("/profile", (req, res) => {
  db.query(
    "SELECT sl.usn,sd.sname,sd.mobile,sd.email,sd.dob,sd.branch,sd.cgpa FROM slogin AS sl INNER JOIN studentdetails AS sd ON sl.usn = sd.usn;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/adminprofile", (req, res) => {
  db.query(
    "SELECT al.email,ad.aname,ad.phone,ad.depname FROM alogin AS al INNER JOIN admindetails AS ad ON al.email = ad.email;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// New route for deleting a student
app.delete("/students/:usn", (req, res) => {
  const usn = req.params.usn;
  console.log("trying to delete student with USN:", usn);

  const query = "DELETE FROM studentdetails WHERE usn = ?";
  
  db.query(query, [usn], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send({ error: "Error deleting student", details: err.message });
    } else {
      console.log("Delete operation result:", result);
      if (result.affectedRows > 0) {
        res.send({ message: "Student deleted successfully", affectedRows: result.affectedRows });
      } else {
        res.status(404).send({ error: "Student not found", affectedRows: 0 });
      }
    }
  });
});

app.put("/students/:usn", (req, res) => {
  const usn = req.params.usn;
  const { sname, mobile, email, dob, branch, cgpa } = req.body;

  const query = "UPDATE studentdetails SET sname = ?, mobile = ?, email = ?, dob = ?, branch = ?, cgpa = ? WHERE usn = ?";
  
  db.query(query, [sname, mobile, email, dob, branch, cgpa, usn], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send({ error: "Error updating student", details: err.message });
    } else {
      console.log("Update operation result:", result);
      if (result.affectedRows > 0) {
        res.send({ message: "Student updated successfully", affectedRows: result.affectedRows });
      } else {
        res.status(404).send({ error: "Student not found", affectedRows: 0 });
      }
    }
  });
});
