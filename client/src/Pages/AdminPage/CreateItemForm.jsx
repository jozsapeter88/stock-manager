import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TopNavbar from "../Navbar/Navbar";

const CreateItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    suggestedQuantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemDto = {
      name: formData.name,
      price: formData.price,
      quantity: formData.quantity,
      suggestedQuantity: formData.suggestedQuantity,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/item/addItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            itemDto
          ),
        }
      );
      console.log("Data to be sent:", formData);

      if (response.ok) {
        const newItem = await response.json();
        console.log("Item added:", newItem);
      } else {
        console.error("Error adding item:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <>
      <TopNavbar />
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <h2>Create an Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Suggested Quantity</label>
            <input
              type="number"
              name="suggestedQuantity"
              value={formData.suggestedQuantity}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <Button variant="warning" onClick={handleSubmit}>
            Create Item
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateItemForm;
