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
import TopNavbar from "../Navbar/Navbar";
import { useAuth } from "../../Contexts/AuthContext";
import { fetchAllSuppliers } from "../SupplierPage/SupplierPage";

function OrderItem({ item, onChange }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    onChange(item, quantity);
  }, [item, quantity]);

  return (
    <li key={item.id}>
      <strong>{item.name}</strong>
      <InputGroup className="mb-3">
        <InputGroup.Text>Quantity</InputGroup.Text>
        <Form.Control
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </InputGroup>
    </li>
  );
}

const fetchItems = async () => {
  try {
    return await fetch(process.env.REACT_APP_API_URL + "/item/getItems");
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const fetchFacilityDetails = async (id) => {
  try {
    return await fetch(
      process.env.REACT_APP_API_URL + `/facility/getFacility/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
  } catch (error) {
    console.error("Error fetching facility details:", error);
  }
}

export default function FacilityDetails() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [itemDetails, setItemDetails] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  console.log(allSuppliers)
  const [selectedSupplierId, setSelectedSupplierId] = useState(null)
  console.log("id" + selectedSupplierId)
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  console.log(orderItems)
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchFacilityDetails(id)
    .then((data) => data.json())
    .then((facilities) =>setFacility(facilities) )
        
    fetchItems()
    .then((data) => data.json())
    .then((items) => setItemDetails(items))
        
    fetchAllSuppliers()
    .then((data) => data.json())
    .then((suppliers) => setAllSuppliers(suppliers))
      
  }, [id]);

  if (!facility || itemDetails.length === 0) {
    return <div>Loading facility details...</div>;
  }

  const filteredItems = itemDetails.filter(
    (item) => item.sport === facility.sport
  );

  const selectedSupplierName = (supplierID) => {
    if(supplierID !== null){
      console.log(allSuppliers[supplierID])
      return allSuppliers.find(s => s.id === supplierID).name;
    }else return "Select Supplier";
  }
  console.log("name" + selectedSupplierName)
  const addToOrder = (item, quantity) => {
    setSelectedItems([...selectedItems, item]);
    setOrderItems([...orderItems, { item, quantity }]);
  };

  const convertOrderItems = () => {
    let orderItemsArray = [];
    for (let iq of orderItems) {
      console.log(iq)
      orderItemsArray.push({itemId: iq.item.id, quantity: iq.quantity })
    }
    return orderItemsArray;
  }
  const placeOrder = async () => {
    try {
      const selectedOrder = {
        facilityId: facility.id,
        itemquantities: convertOrderItems(),
        supplierId: selectedSupplierId,
        comment: comment,
      };
      console.log(selectedOrder);
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/order/addOrder/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        }
      );
      if(response.ok){
        setSuccessMessage("Order placed successfully!");
        setShowModal(false);
        setSelectedItems([]);
        setOrderItems([]);
        setSelectedSupplierId(null);
        setComment("");
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }else if(response.status === 404){
        console.error("User is not found!")
      } 
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <TopNavbar />
      <div className="table-container">
        <Link
          to={`/facilities/${user.id}`}
          variant="warning"
          style={{ marginBottom: "10px" }}
        >
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
        {/* Success message */}
        {showSuccessMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <Table striped bordered hover style={{ outline: "2px solid" }}>
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
        <Table striped bordered hover style={{ outline: "2px solid" }}>
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
              <tr key={item.id}>
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
          setSelectedItems([]);
          setOrderItems([]);
          setComment("");
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
                  {selectedItems.length > 0
                    ? selectedItems.map((item) => item.name).join(", ")
                    : "Select items"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {filteredItems.map((item) => (
                    <Dropdown.Item
                      key={item.id}
                      onClick={() => addToOrder(item, 1)} // Set initial quantity to 1
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            {selectedItems.length > 0 && (
              <div>
                <h4>Selected Items:</h4>
                <ul>
                  {orderItems.map((orderItem, index) => (
                    <OrderItem
                      key={index}
                      item={orderItem.item}
                      onChange={(item, quantity) =>
                        setOrderItems((prevItems) => {
                          const updatedItems = [...prevItems];
                          updatedItems[index] = { item, quantity };
                          return updatedItems;
                        })
                      }
                    />
                  ))}
                </ul>
              </div>
            )}
            <Form.Group>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                {selectedSupplierName(selectedSupplierId)}
                
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {allSuppliers.map((supplier) => (
                    <Dropdown.Item
                      key={supplier.id}
                      onClick={() => setSelectedSupplierId(supplier.id)} // Set initial quantity to 1
                    >
                      {supplier.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <InputGroup>
              <InputGroup.Text>Add your comment</InputGroup.Text>
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