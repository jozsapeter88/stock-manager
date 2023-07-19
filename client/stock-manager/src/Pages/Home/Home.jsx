import React, { useEffect, useState, useContext } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import "./Home.css";
import TopNavbar from "../Navbar";

export default function Home() {
  const [facilities, setFacilities] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/facilities");
        const data = await response.json();
        setFacilities(data);
      } catch (error) {
        throw error;
      }
    };

    fetchFacilities();
  }, []);

  return (
    <div>
      <TopNavbar />
      <Alert className="alert" show={show} variant="danger">
        <Alert.Heading>Login to get access</Alert.Heading>
        <p>
          To see your personal dashboard and access your facilities, please log
          in!
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-secondary">
            Close
          </Button>
        </div>
      </Alert>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Sport</th>
              <th>City</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facilities &&
              facilities.map((facility) => (
                <tr key={facility._id}>
                  <td>{facility.name}</td>
                  <td>{facility.sport}</td>
                  <td>{facility.city}</td>
                  <td>{facility.address}</td>
                  <td>
                    <Link
                      to={`/facilities/${facility._id}`}
                      className="btn btn-warning btn-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
