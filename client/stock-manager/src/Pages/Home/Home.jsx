import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./Home.css";
import TopNavbar from "../Navbar";
import { useAuth } from "../../Contexts/AuthContext";

export default function Home() {
  const [facilities, setFacilities] = useState(null);
  const [facilitiesOfUser, setFacilitiesOfUser] = useState([]);
  const [show, setShow] = useState(true);
  const { user } = useAuth();
  const {id} = useParams();

  console.log("home: "+user.userName)
  console.log(user.id)
console.log(facilitiesOfUser.length)
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch( process.env.REACT_APP_API_URL + "/facility/facilities");
        const data = await response.json();
        setFacilities(data);
      } catch (error) {
        throw error;
      }
    };

    fetchFacilities();
    fetchFacilitiesOfUser();
  }, []);


  const fetchFacilitiesOfUser = async () => {
    try {
      const response = await fetch( process.env.REACT_APP_API_URL + `/facility/facilities/${user.id}`);
      const data = await response.json();
      console.log(data)
      setFacilitiesOfUser(data);
    } catch (error) {
      throw error;
    }
  };
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
