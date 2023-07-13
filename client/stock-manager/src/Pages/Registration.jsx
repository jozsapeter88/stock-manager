import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
export default function Registration() {
  return (
    <div className="d-flex align-items-center" style={{ height: "70vh" }}>
      <form className="m-auto">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            placeholder="Enter name"
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
            className="form-control"
          />
        </div>
        <Link to="/allhospitals">
          <Button variant="primary">Registration</Button>
        </Link>
      </form>
    </div>
  )
}
