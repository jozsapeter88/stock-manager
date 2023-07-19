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

export default function FacilityDetails() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [itemDetails, setItemDetails] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/facilities/${id}`
        );
        const data = await response.json();
        setFacility(data);

        // Fetch item details as well
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

  const filteredItems = itemDetails.filter(
    (item) => item.sport === facility.sport
  );

  const placeOrder = async () => {
    try {
      const order = {
        facility: facility._id,
        items: [selectedItem._id],
        quantity: quantity,
        comment: comment, 
      };

      const response = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      console.log("Order placed successfully:", data);

      setShowModal(false);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  return (
    <div>
      <div className="table-container">
        <TopNavbar />
        <Link to="/home" variant="warning" style={{ marginBottom: "10px" }}>
          <Button variant="outline-warning">Back</Button>
        </Link>
        <Button
          variant="warning"
          style={{ float: "right" }}
          onClick={() => setShowModal(true)}
        >
          Order
        </Button>
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
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedItem(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Place Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  {selectedItem ? selectedItem.name : "Select an item"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {filteredItems.map((item) => (
                    <Dropdown.Item
                      key={item._id}
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <InputGroup className="mb-3">
              <InputGroup.Text>Quantity</InputGroup.Text>
              {/* Add the onChange event handler to update the quantity state */}
              <Form.Control
                aria-label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Add your comment</InputGroup.Text>
              {/* Add the onChange event handler to update the comment state */}
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="warning" onClick={placeOrder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
