import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import TopNavbar from "../Navbar";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("All facilities");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/order-history");
      const data = await response.json();

      for (const order of data) {
        const facilityId = order.facility;
        const facilityResponse = await fetch(
          `http://localhost:5001/api/facilities/${facilityId}`
        );
        const facilityData = await facilityResponse.json();
        order.facility = facilityData.name;
      }

      setOrderHistory(data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Order deleted successfully:", data);

      fetchOrderHistory();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const confirmDelivered = async () => {
    try {
      if (selectedOrderId) {
        const response = await fetch(
          `http://localhost:5001/api/orders/${selectedOrderId}/confirm`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          console.log("Order confirmed and removed successfully.");
          fetchOrderHistory(); // Fetch updated order history after confirming delivery
        } else {
          console.error("Failed to confirm order. Status:", response.status);
        }
      } else {
        console.error("Selected order ID is not valid.");
      }
  
      setShowConfirmModal(false);
      setSelectedOrderId(null);
    } catch (error) {
      console.error("Error confirming delivery:", error);
    }
  };

  const uniqueFacilities = [
    "All facilities",
    ...new Set(orderHistory.map((order) => order.facility)),
  ];

  const filteredOrderHistory = orderHistory.filter((order) => {
    const itemNames = order.items?.map((item) => item.name.toLowerCase());
    const facilityMatch =
      selectedFacility === "All facilities" ||
      order.facility === selectedFacility;

    return (
      itemNames?.some((itemName) =>
        itemName.includes(searchItem.toLowerCase())
      ) && facilityMatch
    );
  });

  return (
    <div>
      <TopNavbar />
      <div className="table-container">
        <h1>Order History</h1>
        <Form>
          <Form.Group>
            <Form.Select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
            >
              {uniqueFacilities.map((facility) => (
                <option key={facility} value={facility}>
                  {facility}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by Item Name..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </Form.Group>
        </Form>
        <br />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Facility</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrderHistory.map((order) => (
              <tr key={order._id}>
                <td>{order.facility}</td>
                <td>{order.items.map((item) => item.name).join(", ")}</td>
                <td>{order.quantity}</td>
                <td>{order.comment}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteOrder(order._id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="success"
                    onClick={() => {
                      setSelectedOrderId(order._id);
                      setShowConfirmModal(true);
                    }}
                  >
                    Confirm Delivered
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Confirm Delivered Modal */}
        <Modal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delivery</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to confirm delivery for this order?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={confirmDelivered}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default OrderHistory;
