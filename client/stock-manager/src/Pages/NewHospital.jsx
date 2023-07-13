import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewHospital() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [taxCode, setTaxCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHospital = {
      name: name,
      country_code: countryCode,
      post_code: postCode,
      city: city,
      address: address,
      email: email,
      tax_Code: taxCode,
    };
    console.log(newHospital);
  };
  /*const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData)
    const entries = [...formData.entries()];
console.log(entries)
    const hospital = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    
    console.log(hospital)
    
  
    //return onSave(employee);
    
  };*/
  return (
    <>
      <h1 className="display-4">Add New Hospital</h1>
      <form className="HospitalForm" onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            //defaultValue={employee ? employee.name : null}
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="countryCode">CountryCode:</label>
          <input
            //defaultValue={employee ? employee.name : null}
            name="countryCode"
            id="countryCode"
            onChange={(e) => setCountryCode(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="postCode">Post Code:</label>
          <input
            //defaultValue={employee ? employee.name : null}
            name="postCode"
            id="postCode"
            onChange={(e) => setPostCode(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="city">City:</label>
          <input
            //defaultValue={employee ? employee.name : null}
            name="city"
            id="city"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="address">Address:</label>
          <input
            //defaultValue={employee ? employee.name : null}
            name="address"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="email">Email:</label>
          <input
            //defaultValue={employee ? employee.name : null}
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="taxCode">Tax Code:</label>
          <input
            //defaultValue={employee ? employee.name : null}
            name="taxCode"
            id="taxCode"
            onChange={(e) => setTaxCode(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button type="submit">Add Hospital</button>

          <button type="button" onClick={() => navigate("/allhospitals")}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
