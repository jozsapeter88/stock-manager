import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import TopNavbar from "../Navbar";

export default function FacilityDetails() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [itemDetails, setItemDetails] = useState([]);

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/facilities/${id}`
        );
        const data = await response.json();
        setFacility(data);
        await fetchItemDetails(data.items);
      } catch (error) {
        console.error("Error fetching facility details:", error);
      }
    };

    const fetchItemDetails = async (itemIds) => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/items?id=${itemIds.join(",")}`
        );
        const data = await response.json();
        setItemDetails(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchFacilityDetails();
  }, [id]);

  if (!facility || itemDetails.length === 0) {
    return <div>Loading facility details...</div>;
  }

  // Filter itemDetails based on the sport category of the facility
  const filteredItems = itemDetails.filter((item) => item.sport === facility.sport);

  return (
    <div>
      <TopNavbar />
      <Link to="/home" variant="warning" style={{ marginBottom: "10px" }}>
        <Button variant="outline-warning">Back</Button>
      </Link>
      <div className="table-container">
      <h1>{facility.name}</h1>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Sport</td>
            <td>{facility.sport}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{facility.city}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{facility.address}</td>
          </tr>
          <tr>
            <td>Users</td>
            <td>{facility.users}</td>
          </tr>
        </tbody>
      </Table>
      <h2>Item Stock:</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item._id}>
              <td>{item.sport}</td>
              <td>
                <strong>{item.name}</strong>
              </td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}
