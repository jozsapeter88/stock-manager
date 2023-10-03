import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditSupplierModal({ show, onClose, supplier, onSave }) {
  const [editedSupplier, setEditedSupplier] = useState({ ...supplier });
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSupplier({ ...editedSupplier, [name]: value });
  };

  const handleSave = () => {
    if (validateInput()) {
      onSave(editedSupplier);
      onClose();
    }
  };

  const validateInput = () => {
    if (!editedSupplier.name) {
      alert("Name is required.");
      return false;
    }
    if (!editedSupplier.category) {
      alert("Category is required.");
      return false;
    }
    if (!editedSupplier.location) {
      alert("Location is required.");
      return false;
    }
    return true;
  };

  const handleCloseModal = () => {
    setSelectedSupplier(null);
    setShowEditModal(false);
  };

  const handleDeleteSupplier = async () => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this supplier?");
  
    if (confirmDeletion) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/supplier/deleteSupplier/${supplier.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        console.log("Supplier deleted successfully.");
        handleCloseModal();
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };
  
  

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Supplier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedSupplier.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={editedSupplier.category}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={editedSupplier.location}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comment"
              value={editedSupplier.comment}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={handleDeleteSupplier}
          className="mr-2"
        >
          Delete
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditSupplierModal;
