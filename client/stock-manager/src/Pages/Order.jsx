import React from 'react'
import { Button } from 'react-bootstrap'

export default function Order() {
  return (
    <div className="container d-flex align-items-center" style={{height: "70vh"}}>
      <form className="mx-auto">
        <h1 className="text-center mb-3">Mask Order Form</h1>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" className="form-control" id="address" name="address" />
        </div>
        <div className="form-group">
          <label htmlFor="mask-type">Mask Type:</label>
          <select className="form-control" id="mask-type" name="mask-type">
            <option value="cloth">KN95</option>
            <option value="cloth">FFP2</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" className="form-control" id="quantity" name="quantity" min="1000" />
        </div>
        <Button className="btn btn-primary btn-block">Submit Order</Button>
      </form>
    </div>
  )
}