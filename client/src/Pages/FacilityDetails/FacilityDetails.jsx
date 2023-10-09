import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Table,
  Button,
  Modal,
  Form,
  Dropdown,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import TopNavbar from "../Navbar/Navbar";
import { useAuth } from "../../Contexts/AuthContext";
import { fetchAllSuppliers } from "../SupplierPage/SupplierPage";
import { DispatchForm } from "../DispatchForm/DispatchForm";
import { BsFillExclamationTriangleFill } from 'react-icons/bs';


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

const addDispatch = async (userId, dispatch) => {
  try{
    return await fetch(process.env.REACT_APP_API_URL + `/item/addDispatch/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dispatch),
    })
  }catch (error) {
    console.error("Error adding Dispatch:", error);
  }
}

const addOrder = async (userId, selectedOrder) => {
  try{
    return await fetch(
      process.env.REACT_APP_API_URL +
        `/order/addOrder/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedOrder),
      });
    } catch (error) {
      console.error("Error placing order:", error);
    }
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
  //Suppliers
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null)
  //Items
  const [items, setItems] = useState([]);
 
  //Order related
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [comment, setComment] = useState("");
  //Dispatch useStates
  const [dispatchComment, setDispatchComment] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null)
  //Modals and Messages
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  //User
  const { user } = useAuth();

  useEffect(() => {
    fetchFacilityDetails(id)
    .then((data) => data.json())
    .then((facilities) =>setFacility(facilities) )
        
    fetchItems()
    .then((data) => data.json())
    .then((items) => setItems(items))
        
    fetchAllSuppliers()
    .then((data) => data.json())
    .then((suppliers) => setAllSuppliers(suppliers))
      
  }, [id]);

  const selectedSupplierName = (supplierID) => {
    if(supplierID !== null){
      return allSuppliers.find(s => s.id === supplierID).name;
    }else return "Select Supplier";
  }
  
  const selectedItemName = (itemId) => {
    if(itemId !== null){
      return items.find(i => i.id === itemId).name;
    }
  }

  const convertOrderItems = () => {
    let orderItemsArray = [];
    for (let iq of orderItems) {
      orderItemsArray.push({itemId: iq.item.id, quantity: iq.quantity })
    }
    return orderItemsArray;
  }

  const filteredItems = facility ? [...items].filter((item) => item.sport === facility.sport): [];

  const sortedItems = [...filteredItems].sort((a, b) => b.quantity - a.quantity);

  const addToOrder = (item, quantity) => {
    setSelectedItems([...selectedItems, item]);
    setOrderItems([...orderItems, { item, quantity }]);
  };

  const placeOrder = async () => {
      const selectedOrder = {
        facilityId: facility.id,
        itemquantities: convertOrderItems(),
        supplierId: selectedSupplierId,
        comment: comment,
      };
      const response = await addOrder(user.id, selectedOrder)
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
  };

  const placeDispatch = async () => {
    let dispatch = {
      comment: dispatchComment,
      quantity: itemQuantity,
      itemId: selectedItemId,
      facilityId: facility.id
    }
   const response = await addDispatch(user.id, dispatch);
   if(response.ok){
    setShowDispatchModal(!showDispatchModal)
    setSuccessMessage("Items dispatched successfully!");
    setDispatchComment("")
    setItemQuantity(0)
    fetchItems()
    .then((data) => data.json())
    .then((items) => setItems(items))
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  } else if(response.status === 404){
    console.error("User is not found!")
  } }
  
  if (!facility || items.length === 0) {
    return <div>Loading facility details...</div>;
  }

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.sport}</td>
                <td>
                  <strong>{item.name}</strong>
                </td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td><Button
                variant="warning"
                style={{ float: "right" }}
                onClick={() => {
                  setSelectedItemId(item.id)
                  setShowDispatchModal(true)
                }}>
                  Dispatch
                  </Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <DispatchForm
      showDispatchModal={showDispatchModal}
      setShowDispatchModal={setShowDispatchModal}
      setDispatchComment = {setDispatchComment}
      dispatchComment = {dispatchComment}
      itemQuantity = {itemQuantity}
      setItemQuantity = {setItemQuantity}
      placeDispatch = {placeDispatch}
      selectedItemName = {selectedItemName(selectedItemId)}
      />
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
                  {filteredItems.length > 0 
                  ? filteredItems.map((item) => (
                    <Dropdown.Item
                      key={item.id}
                      onClick={() => addToOrder(item, 1)} // Set initial quantity to 1
                    >
                      {item.name}
                    </Dropdown.Item>
                  )): "No items"}
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