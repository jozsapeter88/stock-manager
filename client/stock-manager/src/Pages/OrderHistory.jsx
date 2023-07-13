import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function OrderHistory(){
const {id} = useParams();
const [data, setData] = useState(null);
const [message, setMessage] = useState(null);


useEffect(() => {
    fetch(`http://localhost:5001/orderhistory/${id}`)
    .then(pack => pack.json())
    .then(info => {
        if(info[0].message){
            setMessage(info[0].message);
        }
        setData(info)})
}, [id])


return(
    <div>
        <h1>{data && data[0].client}</h1>
        {message ? message :
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Quantity</th>
                </tr>
            </thead>
    <tbody>
    {data && data.map(x => {
        return (
            <tr key={`orderNumber${data.indexOf(x)}`}><td>{x.date}</td><td>{x.items[0].product_id}</td><td>{x.items[0].quantity}</td></tr>
        )
    })}
    </tbody>
    </table>
    }
    <Link to={"/allhospitals"}><button>Back to main page</button></Link>
    </div>

)

}

export default OrderHistory;