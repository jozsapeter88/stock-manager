import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import TopNavbar from "../Navbar";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/order-history");
      const data = await response.json();
      setOrderHistory(data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Order deleted successfully:", data);

      // After deleting the order, update the order history list
      fetchOrderHistory();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <TopNavbar />
      <div className="table-container">
        <h1>Order History</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Facility</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order._id}>
                <td>{order.facility.name}</td>
                <td>{order.items.map((item) => item.name).join(", ")}</td>
                <td>{order.quantity}</td>
                <td>{order.comment}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => deleteOrder(order._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderHistory;
