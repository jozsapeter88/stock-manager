import React, { useState } from "react";
import {
    Button,
    Modal,
    Form,
    InputGroup,
  } from "react-bootstrap";

export const DispatchForm = ({showDispatchModal, setShowDispatchModal}) => {
    const [count, setCount] = useState(0);
    const [comment, setComment] = useState("");
    const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
    };
  
    const handleDecrement = () => {
      setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setCount(isNaN(value) ? 0 : value);
      };

    return(
        <div>
        <Modal
        show={showDispatchModal}
        onHide={() => {
          setShowDispatchModal(false);
          setComment("");
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Dispatch Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <InputGroup>
                <InputGroup.Text>Number Of Items to dispatch</InputGroup.Text>
                <Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
                <Form.Control type="text" value={count} onChange={handleChange} />
                <Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
            </InputGroup>
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
          <Button variant="secondary" onClick={() => setShowDispatchModal(false)}>
            Close
          </Button>
          <Button variant="warning" >
            Dispatch Items
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
    )
}