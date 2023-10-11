import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import TopNavbar from "../Navbar/Navbar";
import Loading from "../Loading";
import { fetchFacilities } from "../AdminPage/AdminPage";
import { fetchAllSuppliers } from "../SupplierPage/SupplierPage";
import "./OrderHistory.css";
 
const fetchOrderHistory = async (user) => {
  try {
    return await fetch(
      `${process.env.REACT_APP_API_URL}/order/getOrders/${user.id}`
    );
  } catch (error) {
    console.error("Error fetching order history:", error);
  }
};

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("All facilities");
  const [selectedSupplier, setSelectedSupplier] = useState("All suppliers");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderIdForDeletion, setSelectedOrderIdForDeletion] =
    useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  console.log(suppliers)
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedSupplierDetails, setSelectedSupplierDetails] = useState(null);
 
 
 
 
  
  useEffect(() => {
    
    fetchFacilities()
    .then((data)=>{
      setFacilities(data)
    } );
 
    fetchAllSuppliers()
    .then((data) => setSuppliers(data))

    fetchOrderHistory(user)
      .then((data) => data.json())
      .then((orders) => setOrderHistory(orders));
      setLoading(false)
  }, [user]);
 
  const deleteOrder = async (orderId) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/order/deleteOrder/${user.id}/${orderId}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
 
      if (response.ok) {
        const data = await response.json();
        setOrderHistory(data);
        console.log("Order successfully deleted");
      } else {
        console.error(`Failed to delete order. Status: ${response.status}`);
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
 
  const filteredOrders = orderHistory.filter((order) => {
    const isFacilityFiltered =
      selectedFacility === "All facilities" ||
      order.facility.name === selectedFacility;
 
    const isItemNameFiltered =
      searchItem.trim() === "" ||
      order.orderItemQuantities.some((itemQuantity) =>
        itemQuantity.item.name.toLowerCase().includes(searchItem.toLowerCase())
      );
 
    const isSupplierFiltered =
      selectedSupplier === "All suppliers" ||
      order.supplier.name === selectedSupplier;
 
    return isFacilityFiltered && isItemNameFiltered && isSupplierFiltered;
  });
 
  if (loading) {
    return <Loading />;
  }
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
              <option value="All facilities">All facilities</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.name}>
                  {facility.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              <option value="All suppliers">All suppliers</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.name}>
                  {supplier.name}
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
              <th>Content</th>
              <th>Supplier</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className={
                  order.isDelivered ? "green-background" : "default-background"
                }
              >
                <td>{order.facility.name}</td>
                <td>
                  {order.orderItemQuantities.map((itemQuantity) => (
                    <tr key={itemQuantity.item.id}>
                      <td>
                        {itemQuantity.item.name}: {itemQuantity.quantity}
                      </td>
                    </tr>
                  ))}
                </td>
                <td>
                <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectedSupplierDetails(order.supplier);
                      setShowSupplierModal(true);
                    }}
                  >
                    {order.supplier.name} <i class="fa-solid fa-arrow-right"></i>
                  </Button>
                </td>
                <td>{order.comment}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedOrderIdForDeletion(order.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setShowConfirmModal(true);
                    }}
                    disabled={order.isDelivered}
                  >
                    Confirm Delivered
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
 
        <Modal
  show={showSupplierModal}
  onHide={() => setShowSupplierModal(false)}
>
<Modal.Header closeButton>
  {selectedSupplierDetails ? (
    <Modal.Title>{selectedSupplierDetails.name}</Modal.Title>
  ) : (
    <Modal.Title>No Supplier Selected</Modal.Title>
  )}
</Modal.Header>
  <Modal.Body>
    {selectedSupplierDetails && (
      <>
        <p><b>Name:</b> {selectedSupplierDetails.name}</p>
        <p><b>Category:</b> {selectedSupplierDetails.category}</p>
        <p><b>Location:</b> {selectedSupplierDetails.location}</p>
        <p><b>Comment:</b> {selectedSupplierDetails.comment}</p>
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => setShowSupplierModal(false)}
    >
      Close
    </Button>
  </Modal.Footer>
</Modal>
 
 
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
 
        {/* Confirm Delete Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this order?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedOrderIdForDeletion(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteOrder(selectedOrderIdForDeletion);
                setShowDeleteModal(false);
                setSelectedOrderIdForDeletion(null);
              }}
            >
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
 
export default OrderHistory;
 
