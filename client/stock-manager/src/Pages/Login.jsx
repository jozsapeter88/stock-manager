import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const findUser = (user) => {
  return fetch("http://localhost:1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { doctorId, setDoctorId } = useContext(AuthContext);

  const handleUpdate = () => {
    const user = {
      userName: name,
      passWord: password,
    };

    findUser(user).then((obj) => {
      if (obj.status == "OK") {
        setDoctorId(obj.content);
        console.log("ez a drID: " + obj.content);
      } else {
        window.alert(obj.content);
      }
    });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <form className="p-5">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <Link to="/allhospitals">
          <Button
            variant="primary"
            onClick={(e) => handleUpdate()}
            className="btn btn-primary mt-3"
          >
            Login
          </Button>
        </Link>
      </form>
    </div>
  );
}
