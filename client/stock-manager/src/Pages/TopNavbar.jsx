import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./TopNavbar.css";

export default function TopNavbar() {
  return (
    <>
      <Navbar expand="lg" variant="light" className="navbar" data-bs-theme="light">
        <Navbar.Brand as={Link} to="/home" style={{ marginLeft: "20px" }}>
          <div className="logo">
            <img src={process.env.PUBLIC_URL + "/rac.png"} alt="" height="75" width="110" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{fontWeight: "bold"}} className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/users" className="nav-link">Users</Nav.Link>
            <Nav.Link as={Link} to="/facility-list" className="nav-link">Facility List</Nav.Link>
            <Nav.Link as={Link} to="/order-history" className="nav-link">Order History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}
