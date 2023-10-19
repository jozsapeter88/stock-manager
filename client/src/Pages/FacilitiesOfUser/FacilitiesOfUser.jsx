import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Alert } from "react-bootstrap";
import TopNavbar from "../Navbar/Navbar";
import { useAuth } from "../../Contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import Loading from "../Loading";
import "./FacilitiesOfUser.css";

const fetchFacilitiesOfUser = async (userId) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/facility/facilities/${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
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
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(true);

  useEffect(() => {
    fetchFacilitiesOfUser(user.id).then((data) => {
      setFacilities(data);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  const categoryEnum = {
    0: "Sport",
    1: "Clothing",
    2: "Electronics",
    3: "Home",
    4: "Beauty",
    5: "Games",
    6: "Food",
    7: "Beverages",
    8: "Healthcare",
  };

  const getCategoryName = (categoryValue) => {
    return categoryEnum[categoryValue] || "Unknown";
  };

  return (
    <div>
      <TopNavbar />
      <div className="header-title">
        <h1>My Facilities</h1>
      </div>
      <div className="additional-text-container">
        {showWelcomeAlert && (
          <Alert
            variant="warning"
            onClose={() => setShowWelcomeAlert(false)}
            dismissible
          >
            <Alert.Heading>
              Welcome to the Stock Management System!
            </Alert.Heading>
            <p>
              • Choose a facility and click on the <b>View</b> button to see its
              inventory, place an order, or dispatch items. <br></br>• To see
              the existing orders with their details, click on the{" "}
              <b>Order history</b> option. <br></br>• To manage the suppliers,
              click on the <b>Suppliers</b> option. <br></br>• To see global and
              personal statistics, click on the <b>Statistics</b> option.{" "}
              <br></br>• After you finish, do not forget to <b>Sign out</b>.
            </p>
          </Alert>
        )}
      </div>
      <div className="table-container">
        {(facilities && facilities.length > 0) || user.role === 0 ? (
          <Table striped bordered hover style={{ outline: "2px solid" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>City</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr key={facility.id} style={{ cursor: "pointer" }}>
                  <td>{facility.name}</td>
                  <td>{getCategoryName(facility.category)}</td>
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
    </div>
  );
}
