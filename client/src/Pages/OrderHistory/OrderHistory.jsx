import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Navbar } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import TopNavbar from "../Navbar";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("All facilities");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { user } = useAuth();

  const fetchOrderHistory = async (user) => {
    try {
      return await fetch(
        `${process.env.REACT_APP_API_URL}/order/getOrders/${user.id}`
      );
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const fetchFacilityDetails = async (user) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/facility/facilities/${user.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFacilities(data);
      } else {
        console.error("Failed to fetch facilities");
      }
    } catch (error) {
      console.error("Error fetching facility details:", error);
    }
  };

  useEffect(() => {
    fetchFacilityDetails(user);

    fetchOrderHistory(user)
      .then((data) => data.json())
      .then((orders) => setOrderHistory(orders));
  }, [user]);

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/order/deleteOrder/${user.id}/${orderId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrderHistory(data);
        console.log("Order successfully deleted");
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      return false;
    }
  };

  const confirmDelivered = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/order/confirmOrder/${selectedOrderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        let order = orderHistory.find((o) => o.id === selectedOrderId);
        console.log(order);
        order.isDelivered = true;
        let data = [...orderHistory];
        let orderInData = data.findIndex((o) => o.id === selectedOrderId);
        console.log(orderInData);
        data[orderInData] = order;
        console.log(data);
        setOrderHistory([...data]);
      } else {
        console.error("Failed to confirm order");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      return false;
    }
  };

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
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.name}>
                  {facility.name}
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

        <Table bordered hover style={{ outline: "2px solid" }}>
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
            {orderHistory.map((order) => (
              <tr
                key={order.id}
                className={
                  order.isDelivered ? "green-background" : "default-background"
                }
              >
                <td>{order.facility.name}</td>
                <td>{order.items.map((item) => item.name).join(", ")}</td>
                <td>{order.quantity}</td>
                <td>{order.comment}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="success"
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setShowConfirmModal(true);
                    }}
                    disabled={order.isDelivered} // Disable the button if the order is already delivered
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
            <Button
              variant="success"
              onClick={() => {
                confirmDelivered();
                setShowConfirmModal(false);
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default OrderHistory;
