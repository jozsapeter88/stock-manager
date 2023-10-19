import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {Link } from "react-router-dom";
import TopNavbar from "../Navbar/Navbar";
import Loading from "../Loading";
import ErrorComponent from "../ErrorPage";

const addItem = async(item) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/item/addItem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          item
        ),
      }) 
      if(response.ok) {
      const newItem = await response.json();
      console.log("Item added:", newItem);
      return newItem;
    } else {
      console.error("Error adding item:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

const fetchCategories = async() => {
  try{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/item/categories`
    );
    if(response.ok){
      const data = await response.json()
      return data;
    } else {
      console.error("Failed to fetch categories");
      throw new Error("Failed to fetch categories");
    } 
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
  }

const CreateItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    suggestedQuantity: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const[options, setOptions] = useState(null)
 
  useEffect(() => {
    fetchCategories()
    .then((data)=>{
      setOptions(data)
      setLoading(false)
    })
    
  }, [])
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
    try{
      setLoading(true)
      const newItem =  await addItem(itemDto);
       setFormData({
        name: "",
        price: "",
        quantity: "",
        suggestedQuantity: "",
      });
      setSuccessMessage(`${newItem.name}(${newItem.quantity}) for ${newItem.price}$ per each added successfully!`);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 6000);
    }catch(error){
      setError(error)
    }finally{

      setLoading(false)
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorComponent error={error} />;
  }
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
            <label>Category</label>
             <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
                >
              {options.map(o => {
                return (<option key={o._id}>{o}</option>)})}      
            </select>
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
          <Link
          to={`/admin`}
          variant="warning"
          style={{ marginBottom: "10px" }}
        >
          <Button variant="outline-warning">Back</Button>
        </Link>
        </form>
        {showSuccessMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default CreateItemForm;
