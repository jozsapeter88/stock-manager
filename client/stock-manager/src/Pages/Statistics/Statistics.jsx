import React, { useState, useEffect } from "react";
import TopNavbar from "../Navbar";

const StatisticsPage = () => {
  const [statisticsData, setStatisticsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/statistics");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStatisticsData(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <TopNavbar />
      <h1>Statistics Page</h1>
      <table>
        <thead>
          <tr>
            <th>Facility Name</th>
            <th>Overall Items</th>
            <th>Overall Value</th>
            <th>Order Ratio</th>
          </tr>
        </thead>
        <tbody>
          {statisticsData.map((item) => (
            <tr key={item.facilityName}>
              <td>{item.facilityName}</td>
              <td>{item.overallItems}</td>
              <td>{item.overallValue}</td>
              <td>{item.orderRatio ? item.orderRatio.toFixed(2) : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsPage;
