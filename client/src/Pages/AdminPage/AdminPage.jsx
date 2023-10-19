import { Table, Modal, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TopNavbar from "../Navbar/Navbar";
import Loading from "../Loading";
import ErrorComponent from "../ErrorPage";
import "./AdminPage.css";
import { BsFillPlusCircleFill } from "react-icons/bs";

export const fetchFacilities = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/facility/facilities"
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch facilities");
      throw new Error("Failed to fetch facilities");
    }
  } catch (error) {
    console.error("Error fetching facility details:", error);
    throw error;
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/user/getUsers"
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch users");
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default function AdminPage() {
  const { user } = useAuth();
  const [facilities, setFacilities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalShowAlert, setModalShowAlert] = useState(false);
  const [modalAlertVariant, setModalAlertVariant] = useState("success");
  const [modalAlertMessage, setModalAlertMessage] = useState("");

  const addFacilityToUser = async (userId, facilityId) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/facility/addFacility/${userId}/${facilityId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        setModalShowAlert(true);
        setModalAlertVariant("success");
        setModalAlertMessage("Facility successfully added");

        // Hide the alert after a few seconds
        setTimeout(() => {
          setModalShowAlert(false);
        }, 5000);
      } else {
        console.error("Facility addition failed");
        setModalShowAlert(true);
        setModalAlertVariant("danger");
        setModalAlertMessage("Facility addition failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setModalShowAlert(true);
      setModalAlertVariant("danger");
      setModalAlertMessage(`Error adding facility: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facilitiesData = await fetchFacilities();
        setFacilities(facilitiesData);
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddFacility = async (id) => {
    await addFacilityToUser(selectedUser.id, id);
  };

  const handleRemoveFacility = (facility) => {
    removeFacilityFromUser(selectedUser.id, facility.id);
  };

  const removeFacilityFromUser = async (userId, facilityId) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/facility/removeFacility/${userId}/${facilityId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setModalShowAlert(true);
        setModalAlertVariant("warning"); // Change this to "warning" for orange color
        setModalAlertMessage("Facility successfully removed");

        // Hide the alert after a few seconds
        setTimeout(() => {
          setModalShowAlert(false);
        }, 5000);
      } else if (response.status === 404) {
        setModalShowAlert(true);
        setModalAlertVariant("danger");
        setModalAlertMessage("Facility is not added to the user");
      } else {
        console.error("Facility removal failed");
        setModalShowAlert(true);
        setModalAlertVariant("danger");
        setModalAlertMessage("Facility removal failed");
      }
    } catch (error) {
      console.error("Error removing facility:", error);
      setModalShowAlert(true);
      setModalAlertVariant("danger");
      setModalAlertMessage(`Error removing facility: ${error.message}`);
    }
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <>
      <TopNavbar />
      <div className="header-title">
        <h1>Admin Page</h1>
      </div>
      <div className="container mt-4">
        <Table striped bordered hover style={{ outline: "2px solid" }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Set Facilities</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleOpenModal(user)}
                    >
                      Manage Facilities
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  {user === null ? "No users found." : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Link
          to={`/addItem`}
          variant="warning"
          style={{ marginBottom: "10px" }}
        >
          <Button
            variant="warning"
            style={{ float: "right", fontSize: "24px" }}
          >
            <BsFillPlusCircleFill />
            &nbsp;Add Item
          </Button>
        </Link>
      </div>

      {/* Facility Management Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Manage Facilities for {selectedUser?.userName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalShowAlert && (
            <Alert
              variant={modalAlertVariant}
              onClose={() => setModalShowAlert(false)}
              dismissible
            >
              {modalAlertMessage}
            </Alert>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr key={facility.id}>
                  <td>{facility.name}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleAddFacility(facility.id)}
                    >
                      Add
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFacility(facility)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
