
//import { Button } from 'react-bootstrap';
import { Link, Outlet } from "react-router-dom";
import "./TopNavbar.css";
import { Navbar, Nav, Button } from "react-bootstrap";


export default function TopNavbar() {
  return (
    <>
      <Navbar expand="lg" data-bs-theme="dark">
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", marginLeft: "20px" }}>
          <div className="logo">
            <img src="https://i.imgur.com/GcFE3gR.png" alt="" height="75" width="150"></img>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Button className="btn" as={Link} to="/login" variant="outline-primary">Login</Button>
            <Button className="btn" as={Link} to="/registration" variant="outline-primary">Registration</Button>
            <Button className="btn" as={Link} to="/order" variant="outline-primary">Order</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}