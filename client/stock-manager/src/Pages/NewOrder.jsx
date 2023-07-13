import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

export default function NewOrder() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [order, setOrder] = useState([]);
  const [pending, setPending] = useState(null);
  const { doctorId } = useContext(AuthContext);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [thisHospital, setThisHospital] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch(`http://localhost:5001/thishospital/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("lefut");
        setThisHospital(data.name);
      });
  }, []);

  function addToPending(amount, price, productID) {
    const newQuantity = parseInt(amount);
    setPending({ product_id: productID, quantity: newQuantity });
    setPendingTotal(parseInt(price) * newQuantity);
  }

  function addToOrder() {
    let currentOrder = [...order];
    currentOrder.push(pending);
    setOrder(currentOrder);
    setPending(null);
    const currentTotal = total;
    setTotal(currentTotal + pendingTotal);
    setPendingTotal(0);
  }

  function placeOrder() {
    const orderObj = {
      user: doctorId,
      client: id,
      order: order,
    };
    fetch("http://localhost:5001/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderObj),
    })
      .then((data) => data.json())
      .then((info) => console.log(info));
  }

  return (
    <div>
      <h1>{thisHospital && thisHospital}</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((x) => {
              return (
                <tr key={x.id}>
                  <td>{x.name}</td>
                  <td>{`${x.price} HUF`}</td>
                  <input
                    onChange={(e) =>
                      addToPending(e.target.value, x.price, x.id)
                    }
                  ></input>
                  <button onClick={addToOrder}>Add</button>
                </tr>
              );
            })}
        </tbody>
      </table>
      <p>{`Total: ${total} HUF`}</p>
      <Link to={"/allhospitals"}>
        <button onClick={placeOrder}>Order</button>
      </Link>
    </div>
  );
}
