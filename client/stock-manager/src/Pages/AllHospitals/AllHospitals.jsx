import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Table, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const fetchHospital = () => {
    return fetch("http://localhost:5001/api/hospitals").then((res) => res.json())
}

export default function AllHospitals() {
    const [hospitals, setHospitals] = useState(null)

    const {doctorId} = useContext(AuthContext);

    useEffect(() => {
        fetchHospital()
            .then((info) => {
                console.log(info[0]._id)
                setHospitals(info)
            })
            .catch((error) => {
                throw error;
            });
    }, [])

    function send() {
        const obj = {
            user: "63e3b6e281ab9568d2b7ba08",
            client: "63e3b6e281ab9568d2b7b9f2",
            order: [{
                product_id: 1,
                quantity: 10
            }]
        }
        console.log("Elindultam")
        fetch('http://localhost:5001/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(data => data.json())
            .then(info => console.log(info));
    }

    function getOrderHistory(input) {
        console.log("order history for hospital " + input);

    }

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
                    {hospitals &&
                        hospitals.map((hosp) => (
                            <tr key={hosp._id}>
                                <td>{hosp.name}</td>
                                <td>{hosp.city}</td>
                                <td>{hosp.country}</td>
                                <td>
                                    <Link to={`/orderhistory/${hosp._id}`}>
                                        <Button variant="info" size="sm">Order history</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Link to={`/myhospitals`}>
            <Button>My Hospitals</Button>
            </Link>
            <Link to={`/newhospital`}>
            <Button>Add New Hospitals</Button>
            </Link>
        </div>
    )
}