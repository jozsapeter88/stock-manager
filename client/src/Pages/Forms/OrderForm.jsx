import React, { useState, useEffect } from "react";
import {
    Button,
    Modal,
    Form,
    InputGroup,
    Dropdown
  } from "react-bootstrap";


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
  
  export const OrderForm = ({
    showModal,
    setShowModal,
    setComment,
    setSelectedItems,
    setOrderItems,
    selectedItems,
    orderItems,
    filteredItems,
    addToOrder,
    selectedSupplierName,
    selectedSupplierId,
    allSuppliers,
    setSelectedSupplierId,
    comment,
    placeOrder}) => {
       
    return (
        <div>
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
    )
  }