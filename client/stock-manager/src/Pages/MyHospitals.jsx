import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const fetchHospital = (id) => {
  return fetch(`http://localhost:5001/hospitals/mine/${id}`).then((res) =>
    res.json()
  );
};

export default function MyHospitals(send) {
  const [myHospitals, setMyHospitals] = useState([]);
  const { doctorId } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:1/hospitals/mine/${doctorId}`)
      .then((data) => data.json())
      .then((info) => {
        console.log(info);
        setMyHospitals(info);
      });
  }, []);

  return (
    <div>
      <h1 className="display-4">Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {myHospitals &&
            myHospitals.map((hosp) => (
              <tr key={hosp._id}>
                <td>{hosp.name}</td>
                <td>{hosp.city}</td>
                <td>{hosp.country}</td>
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
      <p>{/*myHospitals && myHospitals[0].name*/}</p>
      <Button onClick={send}>PRESS ME</Button>
    </div>
  );
}
