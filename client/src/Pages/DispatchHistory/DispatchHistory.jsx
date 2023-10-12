import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import TopNavbar from "../Navbar/Navbar";
import "./DispatchHistory.css";
import {fetchFacilities} from "../AdminPage/AdminPage"
import Loading from "../Loading";
import ErrorComponent from "../ErrorPage";

const fetchDispatches = async (id) => {
    try{
        const response = await fetch(process.env.REACT_APP_API_URL + `/item/getDispatches/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
      if(response.ok){
        const data = await response.json()
        return data;
      } else {
        console.error("Failed to fetch dispatches");
        throw new Error("Failed to fetch dispatches");
      } 
    } catch (error) {
      console.error("Error fetching dispatch details:", error);
      throw error;
    }
}
const DispatchHistory = ()=> {

    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState("All facilities");
    const [dispatches, setDispatches] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [searchUserName, setSearchUserName] = useState("")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const { user } = useAuth();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const facilitiesData = await fetchFacilities();
          setFacilities(facilitiesData);
          const dispatchData = await fetchDispatches(user.id);
          setDispatches(dispatchData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
      }, [user]);

      const isAdmin = () => {
        if(user.role === 0)
        {
            return true;
        } else return false;
      }

      const filteredDispatches = () => {
        let filteredByFacility = dispatches.filter(d => d.facility.name === selectedFacility)
      
        if(selectedFacility === "All facilities" && searchItem === ""){
            return dispatches;
        }else if(selectedFacility !== "All facilities" && searchItem === ""){
            return filteredByFacility;
        } else if(selectedFacility !== "All facilities" && searchItem !== ""){
            return filteredByFacility.filter(d => d.item.name.toLowerCase().includes(searchItem));
        } else{
            return dispatches.filter(d => d.item.name.toLowerCase().includes(searchItem));
        }
      }

      const filteredDispatchesByAdmin = () => {
        if (searchUserName === "" || !isAdmin ) {
            return filteredDispatches();
        }else {
            return filteredDispatches()
            .filter(d => d.user.userName.toLowerCase().includes(searchUserName))}
      }

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
        <h1>Dispatch History</h1>
        <Form>
          <Form.Group>
            <Form.Select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
            >
              <option value="All facilities">All facilities</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.name}>
                  {facility.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by Item Name..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </Form.Group>
          {isAdmin() ? (
            <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by UserName..."
              value={searchUserName}
              onChange={(e) => setSearchUserName(e.target.value)}
            />
          </Form.Group>
          ): null}
        </Form>
        <br />

        <Table bordered hover style={{ outline: "2px solid" }}>
          <thead>
            <tr>
                <th>User</th>
                <th>Facility</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Comment</th>
                <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredDispatchesByAdmin().map((d) => (
              <tr
                key={d.id}
                className={ "default-background"}
              >
                <td>{d.user.userName}</td>
                <td>{d.facility.name}</td>
                <td>{d.item.name}</td>
                <td>{d.quantity}</td>
                <td>{d.comment}</td>
                <td>{new Date(d.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
        </div>
    )
}
export default DispatchHistory;