import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import TopNavbar from "../Navbar/Navbar";
import "./SupplierPage.css";
import EditSupplierModal from "./EditSupplierModal";

export const fetchAllSuppliers = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/supplier/getAllSuppliers`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch suppliers");
      return [];
    }
  } catch (error) {
    console.error("Error fetching suppliers", error);
    return [];
  }
};

function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    comment: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleRowClick = (supplier) => {
    setSelectedSupplier(supplier);
    console.log("Selected Supplier:", supplier);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSupplier(null);
    setShowEditModal(false);
  };

  const handleSaveSupplier = async (editedSupplier) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/supplier/editSupplier/${editedSupplier.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedSupplier),
        }
      );

      if (!response.ok) {
        console.log(editedSupplier);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedSupplier = await response.json();
      console.log("Updated supplier:", updatedSupplier);

      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier.id === updatedSupplier.id ? updatedSupplier : supplier
        )
      );

      setShowAlert(true);
      setAlertVariant("success");
      setAlertMessage("Supplier Update Successful!");

      setTimeout(() => {
        setShowAlert(false);
        handleCloseModal();
      }, 5000);
    } catch (error) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage(`Error Updating Supplier: ${error.message}`);
      console.error("Error updating supplier:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSupplier = async () => {
    const newSupplier = {
      ...formData,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/supplier/addSupplier`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSupplier),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("New supplier saved:", data);

      setSuppliers([...suppliers, data]);

      setFormData({
        name: "",
        category: "",
        location: "",
        comment: "",
      });

      setShowModal(false);
      setShowAlert(true);
      setAlertVariant("success");
      setAlertMessage("Supplier registration successful");

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      console.error("Error saving supplier:", error);

      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("Error saving supplier");
    }
  };

  useEffect(() => {
    fetchAllSuppliers()
    .then((suppliers) => setSuppliers(suppliers));
  }, []);

  return (
    <>
      <TopNavbar />
      <div className="main-container">
        {showAlert && (
          <Alert
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
          dismissible
          >
            {alertMessage}
          </Alert>
        )}
        <p style={{ textAlign: "right" }}><i className="fas fa-info-circle"></i> You can click on a Supplier to edit it</p>
        {isNaN(suppliers.length) ? (
          <p
          className="no-suppliers-message"
          >No Suppliers Available</p>
        ) : (
          <Table striped bordered hover style={{ outline: "2px solid" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  onClick={() => handleRowClick(supplier)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{supplier.name}</td>
                  <td>{supplier.category}</td>
                  <td>{supplier.location}</td>
                  <td>{supplier.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {selectedSupplier && (
          <EditSupplierModal
            show={showEditModal}
            onClose={handleCloseModal}
            supplier={selectedSupplier}
            onSave={handleSaveSupplier}
            fetchAllSuppliers={fetchAllSuppliers}
          />
        )}
        <Button variant="warning" onClick={() => setShowModal(true)}>
          Register New Supplier
        </Button>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Register New Supplier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="warning" onClick={handleAddSupplier}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default SupplierPage;
