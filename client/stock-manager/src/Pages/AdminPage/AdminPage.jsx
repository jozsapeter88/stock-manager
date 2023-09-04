import { Link, Outlet } from "react-router-dom";
import { Table } from "react-bootstrap"; // Import Table component from react-bootstrap
import { useAuth } from "../../Contexts/AuthContext";
import { useState, useEffect } from "react";
import TopNavbar from "../Navbar";

export default function AdminPage() {
  const { user } = useAuth();

  const userData = [
    {
      id: 1,
      UserName: "User1",
      Email: "user1@example.com",
      facilities: ["facility1", "facility2", "facility3", "facility4"],
    },
    {
      id: 2,
      UserName: "User2",
      Email: "user2@example.com",
      facilities: ["facility1", "facility2", "facility3", "facility4"],
    },
  ];

  const [facilities, setFacilities] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/facility/facilities"
        );
        const data = await response.json();
        setFacilities(data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };
    fetchFacilities();
  }, []);

  const handleAddFacility = async (id) => {
    await addFacilityToUser(user.id, id);
  };

  const addFacilityToUser = async (userId, facilityId) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/facility/addFacility/${userId}/${facilityId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        console.log("facility added");
      } else {
        console.error("Facility addition failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Set Facilities</th>
            </tr>
          </thead>
          <tbody>
            {user && user.length > 0 ? (
              user.map((u) => (
                <tr key={u.id}>
                  <td>{u.UserName}</td>
                  <td>{u.Email}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  {user === null
                    ? ("No users found.")
                    : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Outlet />
    </>
  );
}
