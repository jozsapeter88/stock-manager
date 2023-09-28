import React, { useState, useEffect } from "react";
import { Col, Row, Card, Table, Pagination, PageItem } from "react-bootstrap";
import TopNavbar from "../Navbar";
import "./Statistics.css";

const StatisticsPage = () => {
  const [facilitiesData, setFacilitiesData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/facility/facilities`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch facilities");
        }

        const data = await response.json();
        setFacilitiesData(data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/item/getItems`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }

        const data = await response.json();
        setItemsData(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/order/getAllOrders`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrdersData(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchFacilities();
    fetchItems();
    fetchOrders();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = itemsData.slice(startIndex, endIndex);

  return (
    <div className="main-container">
      <TopNavbar />
      <h1>Statistics Page</h1>
      {/* Cards */}

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Number of Facilities</Card.Title>
              <Card.Text>{facilitiesData.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Number of Orders</Card.Title>
              <Card.Text>{ordersData.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Item Types</Card.Title>
              <Card.Text>{itemsData.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Overall Quantity of Items</Card.Title>
              <Card.Text>
                {itemsData.reduce((total, item) => total + item.quantity, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Average Value of Items</Card.Title>
              <Card.Text>
                {itemsData.length > 0
                  ? (
                      itemsData.reduce((total, item) => {
                        if (!isNaN(item.Price) && !isNaN(item.Quantity)) {
                          return total + item.Price * item.Quantity;
                        }
                        return total;
                      }, 0) /
                      itemsData.reduce((totalQuantity, item) => {
                        if (!isNaN(item.Quantity)) {
                          return totalQuantity + item.Quantity;
                        }
                        return totalQuantity;
                      }, 0)
                    ).toFixed(2)
                  : "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Overall Value of Items</Card.Title>
              <Card.Text>
                {itemsData.reduce((total, item) => total + item.value, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Items */}
      <h2>Items</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {itemsToDisplay.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination size="md">
        {Array.from({ length: Math.ceil(itemsData.length / itemsPerPage) }).map(
          (_, index) => (
            <PageItem
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageItem>
          )
        )}
      </Pagination>
    </div>
  );
};

export default StatisticsPage;
