import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Alert } from "react-bootstrap";
import TopNavbar from "../Navbar/Navbar";
import { useAuth } from "../../Contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import "./FacilitiesOfUser.css";
import Loading from "../Loading";

const fetchFacilityDetails = async (userId) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/facility/facilities/${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if(response.ok){
      const data = await response.json()
      return data;
    } else {
      console.error("Failed to fetch facilities");
      return [];
    } 
  } catch (error) {
    console.error("Error fetching facilities of user:", error);
  }
};

export default function FacilitiesOfUser() {
  const [facilities, setFacilities] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
   fetchFacilityDetails(user.id)
   .then((data) => {
      setFacilities(data) 
      setLoading(false)
    });
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <TopNavbar />
      <div className="table-container">
        {(facilities && facilities.length > 0) || user.role === 0 ? (
          <Table striped bordered hover style={{ outline: "2px solid" }}>
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
              {facilities.map((facility) => (
                <tr key={facility.id} style={{ cursor: "pointer" }}>
                  <td>{facility.name}</td>
                  <td>{facility.sport}</td>
                  <td>{facility.city}</td>
                  <td>{facility.address}</td>
                  <td>
                    <Link
                      to={`/facilityDetails/${facility.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      <FaSearch />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="warning" style={{ fontSize: "1.5rem" }}>
            You do not have access to any facilities. Please contact an admin.
          </Alert>
        )}
      </div>
      <div className="additional-text-container">
        <div className="additional-text">
          <p>
          Welcome to the stock management system! <br></br>
          <br></br>
          • Choose a facility and click on the <b>'View'</b> button to see its inventory or place an order. <br></br>
          • To see the existing orders with their details, click on the <b>'Order history'</b>
            option. <br></br>
          • To manage the suppliers, click on the <b>'Suppliers'</b> option. <br></br>
          • To see global and personal statistics, click on the <b>'Statistics'</b>
            option. <br></br>
          • After you finished, do not forget to <b>sign out</b>.
          </p>
        </div>
      </div>
    </div>
  );
}
