import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Table,
  Button,
  Modal,
  Form,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import TopNavbar from "../Navbar";
import { useAuth } from "../../Contexts/AuthContext";
import "./FacilitiesOfUser.css"
import Loading from "../Loading";



export default function FacilitiesOfUser() {
  const { id } = useParams();
  const [facilities, setFacilities] = useState(null);
  const [loading, setLoading] = useState(true);
  
  //const [itemDetails, setItemDetails] = useState([]);

  //const [showModal, setShowModal] = useState(false);

  //const [selectedItem, setSelectedItem] = useState(null);
  //const [quantity, setQuantity] = useState(1);
  //const [comment, setComment] = useState("");
  const { user } = useAuth();
console.log("fou" + user)


  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + `/facility/facilities/${user.id}`, {
            method: "GET",
            credentials: "include"
          })
        const data = await response.json();
        console.log(data)
      
        setFacilities(data);
        setLoading(false);

        // Fetch item details as well
        //await fetchItemDetails(data.items);
      } catch (error) {
        console.error("Error fetching facility details:", error);
      }
    }
    fetchFacilityDetails();
  }, [user]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <TopNavbar />
      <div className="table-container">
        <Link to="/home" variant="warning" style={{ marginBottom: "10px" }}>
          <Button variant="outline-warning">Back</Button>
        </Link>
        
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
                <tr key={facility.id}>
                  <td>{facility.name}</td>
                  <td>{facility.sport}</td>
                  <td>{facility.city}</td>
                  <td>{facility.address}</td>
                  <td>
                    <Link
                      to={`/facilityDetails/${facility.id}`}
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
    </div>
  );
}