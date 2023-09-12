import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TopNavbar from "../Navbar";

export const fetchItems = async () => {
  try {
    return await fetch(process.env.REACT_APP_API_URL + "/item/getItems");
    
  
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
const ItemList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchItems()
    .then((data)=> data.json())
    .then((itemData)=> setProducts(itemData));
  }, []);

  

  return (
    <div>
      <TopNavbar />
      <div className="table-container">
        <h2>Product List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Sport</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.sport}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ItemList;
