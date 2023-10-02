import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import TopNavbar from "../Navbar";
import "./SupplierPage.css";

function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSupplier = () => {
    const newSupplier = {
      id: suppliers.length + 1,
      ...formData,
    };

    setSuppliers([...suppliers, newSupplier]);

    setFormData({
      name: "",
      category: "",
      location: "",
      comment: "",
    });

    setShowModal(false);

    createSupplier(newSupplier);
  };

  const fetchAllSuppliers = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/supplier/getAllSuppliers`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers", error);
    }
  };

  const createSupplier = async (newSupplier) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/supplier/addSupplier`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSupplier),
      });

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
    } catch (error) {
      console.error("Error saving supplier:", error);
    }
  };
  useEffect(() => {
    fetchAllSuppliers();
  }, []);

  return (
    <>
      <TopNavbar />
      <div className="main-container">
        <h1>Suppliers</h1>

        {/* Table */}
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
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.category}</td>
                <td>{supplier.location}</td>
                <td>{supplier.comment}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="warning" onClick={() => setShowModal(true)}>
          Register New Supplier
        </Button>

        {/* Modal for adding new suppliers */}
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
