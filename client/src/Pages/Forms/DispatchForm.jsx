import React, { useState } from "react";
import {
    Button,
    Modal,
    Form,
    InputGroup,
  } from "react-bootstrap";
import "./DispatchForm.css";
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

export const DispatchForm = ({
    showDispatchModal,
    setShowDispatchModal, 
    setDispatchComment,
    dispatchComment,
    itemQuantity,
    setItemQuantity,
    placeDispatch,
    selectedItemName}) => {
    
    const handleIncrement = () => {
      setItemQuantity(prevCount => prevCount + 1);
    };
  
    const handleDecrement = () => {
      setItemQuantity(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setItemQuantity(isNaN(value) ? 0 : value);
      };

    return(
        <div>
        <Modal
        show={showDispatchModal}
        onHide={() => {
          setShowDispatchModal(false);
          setDispatchComment("");
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Dispatch Item: {selectedItemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <InputGroup>
                <InputGroup.Text>Number Of Items to dispatch</InputGroup.Text>
                <Button variant="" onClick={handleDecrement}><FaMinusCircle /></Button>
                <Form.Control type="text" value={itemQuantity} onChange={handleChange} />
                <Button variant="" onClick={handleIncrement}><FaPlusCircle /></Button>
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Add your comment</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                value={dispatchComment}
                onChange={(e) => setDispatchComment(e.target.value)}
              />
            </InputGroup>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDispatchModal(false)}>
            Close
          </Button>
          <Button variant="warning" onClick={()=> placeDispatch()} >
            Dispatch Items
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
    )
}