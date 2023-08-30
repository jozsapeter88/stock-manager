import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const loginUser = async (user) => {
  try {
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return { status: response.status, content: data };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useContext();

  const handleLogin = async () => {
    const user = {
      userName: name,
      passWord: password,
    };

    try {
      const response = await loginUser(user);
      if (response.status === "OK") {
        setUserId(response.content);
        console.log("User ID:", response.content);
      } else {
        window.alert(response.content);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      window.alert("Error logging in. Please try again later.");
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <Button
          variant="primary"
          onClick={handleLogin}
          className="btn btn-primary mt-3"
        >
          Login
        </Button>
        <Link to="/allhospitals" className="btn btn-primary mt-3 ml-3">
          Continue as Guest
        </Link>
      </form>
    </div>
  );
}
