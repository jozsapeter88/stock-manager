import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TopNavbar from "../Navbar";

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/order-history");
        const data = await response.json();
        setOrderHistory(data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div>
      <TopNavbar />
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order._id}>
                <td>{order.items.map((item) => item.name).join(", ")}</td>
                <td>{order.quantity}</td>
                <td>{order.comment || "-"}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
