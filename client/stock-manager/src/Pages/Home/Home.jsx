import React, { useEffect, useState, useContext } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../Contexts/AuthContext";
import "./Home.css";
import TopNavbar from "../TopNavbar";

export default function Home() {
  const [hospitals, setHospitals] = useState(null);
  const [show, setShow] = useState(true);
  const { doctorId } = useContext(AuthContext);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/hospitals");
        const data = await response.json();
        console.log(data[0]._id);
        setHospitals(data);
      } catch (error) {
        throw error;
      }
    };

    fetchHospital();
  }, []);

  return (
    <div>
        <TopNavbar />
      <h1 className="display-4">Dashboard</h1>
      <Alert className="alert" show={show} variant="danger">
        <Alert.Heading>Login to get access</Alert.Heading>
        <p>To see your personal dashboard and access your hospitals, please log in!</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-secondary">
            Close
          </Button>
        </div>
      </Alert>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {hospitals &&
            hospitals.map((hosp) => (
              <tr key={hosp._id}>
                <td>{hosp.name}</td>
                <td>{hosp.city}</td>
                <td>{hosp.country}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
