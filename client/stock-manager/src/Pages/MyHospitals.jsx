import { useState, useEffect, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const fetchHospitalsByDoctorId = (doctorId) => {
  return fetch(`http://localhost:5001/facilities/mine/${doctorId}`).then((res) =>
    res.json()
  );
};

export default function MyHospitals() {
  const [myHospitals, setMyHospitals] = useState([]);
  const { doctorId } = useContext(AuthContext);

  useEffect(() => {
    fetchHospitalsByDoctorId(doctorId)
      .then((data) => {
        console.log(data);
        setMyHospitals(data);
      })
      .catch((error) => {
        console.error("Error fetching hospitals:", error);
      });
  }, [doctorId]);

  return (
    <div>
      <h1 className="display-4">Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myHospitals.map((hosp) => (
            <tr key={hosp._id}>
              <td>{hosp.name}</td>
              <td>{hosp.city}</td>
              <td>{hosp.country_code}</td>
              <td>
                <Link to={`/orderhistory/${hosp._id}`}>
                  <Button variant="info" size="sm">
                    Order history
                  </Button>
                </Link>
                <Link to={`/neworder/${hosp._id}`}>
                  <Button variant="info" size="sm">
                    New order
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
