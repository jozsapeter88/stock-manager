import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import TopNavbar from "../Navbar/Navbar";
import { useAuth } from "../../Contexts/AuthContext";
import { fetchAllSuppliers } from "../SupplierPage/SupplierPage";
import { DispatchForm } from "../Forms/DispatchForm";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { OrderForm } from "../Forms/OrderForm";
import Loading from "../Loading";
import ErrorComponent from "../ErrorPage";

const addDispatch = async (userId, dispatch) => {
  try {
    return await fetch(
      process.env.REACT_APP_API_URL + `/item/addDispatch/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dispatch),
      }
    );
  } catch (error) {
    console.error("Error adding Dispatch:", error);
  }
};

const addOrder = async (userId, selectedOrder) => {
  try {
    return await fetch(
      process.env.REACT_APP_API_URL + `/order/addOrder/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedOrder),
      }
    );
  } catch (error) {
    console.error("Error placing order:", error);
  }
};
const fetchItems = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/item/getItems"
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch items");
      throw new Error("Failed to fetch items");
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const fetchFacilityDetails = async (id) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/facility/getFacility/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch facilities");
      return [];
    }
  } catch (error) {
    console.error("Error fetching facility details:", error);
  }
};

export default function FacilityDetails() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [comment, setComment] = useState("");
  const [dispatchComment, setDispatchComment] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facilitiesData = await fetchFacilityDetails(id);
        setFacility(facilitiesData);
        const usersData = await fetchItems();
        setItems(usersData);
        const suppliers = await fetchAllSuppliers();
        setAllSuppliers(suppliers);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const selectedSupplierName = (supplierID) => {
    if (supplierID !== null) {
      return allSuppliers.find((s) => s.id === supplierID).name;
    } else return "Select Supplier";
  };

  const selectedItemName = (itemId) => {
    if (itemId !== null) {
      return items.find((i) => i.id === itemId).name;
    }
  };

  const convertOrderItems = () => {
    let orderItemsArray = [];
    for (let iq of orderItems) {
      orderItemsArray.push({ itemId: iq.item.id, quantity: iq.quantity });
    }
    return orderItemsArray;
  };

  const filteredItems = facility
    ? [...items].filter((item) => item.category === facility.category)
    : [];
  const sortedItems = [...filteredItems].sort(
    (a, b) => b.quantity - a.quantity
  );

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
    const response = await addOrder(user.id, selectedOrder);
    if (response.ok) {
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
    } else if (response.status === 404) {
      console.error("User is not found!");
    }
  };

  const placeDispatch = async () => {
    let dispatch = {
      comment: dispatchComment,
      quantity: itemQuantity,
      itemId: selectedItemId,
      facilityId: facility.id,
    };
    const response = await addDispatch(user.id, dispatch);
    if (response.ok) {
      setShowDispatchModal(!showDispatchModal);
      setSuccessMessage("Items dispatched successfully!");
      setDispatchComment("");
      setItemQuantity(0);
      fetchItems().then((items) => setItems(items));
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } else if (response.status === 404) {
      console.error("User is not found!");
    }
  };

  const categoryEnum = {
    0: "Sport",
    1: "Clothing",
    2: "Electronics",
    3: "Home",
    4: "Beauty",
    5: "Games",
    6: "Food",
    7: "Beverages",
    8: "Healthcare",
  };

  const getCategoryName = (categoryValue) => {
    return categoryEnum[categoryValue] || "Unknown";
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorComponent error={error} />;
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
              <td>Category</td>
              <td>{getCategoryName(facility.category)}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{facility.city}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{facility.address}</td>
            </tr>
          </tbody>
        </Table>
        <h2>Item Stock:</h2>
        <div style={{ textAlign: "right" }}>
          <BsFillExclamationTriangleFill
            style={{ textAlign: "right", color: "yellow" }}
          />
          Below suggested quantity&nbsp;&nbsp;&nbsp;&nbsp;
          <BsFillExclamationTriangleFill
            style={{ textAlign: "right", color: "red" }}
          />
          Not in stock
        </div>
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
                <td>
                  <td>{getCategoryName(facility.category)}</td>
                </td>
                <td>
                  <strong>{item.name}</strong>
                </td>
                <td>{item.price}</td>
                <td>
                  {item.quantity}&nbsp;
                  {item.quantity === 0 ? (
                    <BsFillExclamationTriangleFill
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  ) : item.quantity < item.suggestedQuantity ? (
                    <BsFillExclamationTriangleFill
                      style={{ color: "yellow", cursor: "pointer" }}
                    />
                  ) : null}
                </td>
                <td>
                  <Button
                    variant="warning"
                    style={{ float: "right" }}
                    onClick={() => {
                      setSelectedItemId(item.id);
                      setShowDispatchModal(true);
                    }}
                  >
                    Dispatch
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <DispatchForm
        showDispatchModal={showDispatchModal}
        setShowDispatchModal={setShowDispatchModal}
        setDispatchComment={setDispatchComment}
        dispatchComment={dispatchComment}
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
        placeDispatch={placeDispatch}
        selectedItemName={selectedItemName(selectedItemId)}
      />
      <OrderForm
        showModal={showModal}
        setShowModal={setShowModal}
        setComment={setComment}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
        setOrderItems={setOrderItems}
        orderItems={orderItems}
        filteredItems={filteredItems}
        addToOrder={addToOrder}
        selectedSupplierName={selectedSupplierName}
        selectedSupplierId={selectedSupplierId}
        allSuppliers={allSuppliers}
        setSelectedSupplierId={setSelectedSupplierId}
        comment={comment}
        placeOrder={placeOrder}
      />
    </div>
  );
}
