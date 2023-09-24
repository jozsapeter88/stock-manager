import { Table, Modal, Button } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { useState, useEffect } from "react";
import TopNavbar from "../Navbar";
import Loading from "../Loading";

export default function AdminPage() {
  const { user } = useAuth();

  const [facilities, setFacilities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/user/getUsers"
        );
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };

    const fetchFacilities = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/facility/facilities"
        );
        const data = await response.json();
        setFacilities(data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };
    fetchFacilities();
    fetchUsers();
  }, []);

  const handleAddFacility = async (id) => {
    await addFacilityToUser(selectedUser.id, id);
  };

  const handleRemoveFacility = (facilityId) => {
    removeFacilityFromUser();
  };

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
        console.log("facility added");
      } else {
        console.error("Facility addition failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const removeFacilityFromUser = async (userId, facilityId) => {
    console.log("user should be removed now");
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

  return (
    <>
      <TopNavbar />
      <div className="container mt-4">
        <Table striped bordered hover style={{ outline: '2px solid'}}>
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
      </div>

      {/* Facility Management Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Manage Facilities for {selectedUser?.userName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                      onClick={() => handleRemoveFacility(facility.id)}
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