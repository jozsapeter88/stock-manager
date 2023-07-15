import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";

export default function TopNavbar() {
  return (
    <>
      <Navbar expand="lg" variant="light" className="navbar" data-bs-theme="light">
        <Navbar.Brand as={Link} to="/home" style={{ marginLeft: "20px" }}>
          <div className="logo">
            <img
              src={process.env.PUBLIC_URL + "/rac.png"}
              alt=""
              height="75"
              width="110"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ fontWeight: "bold" }} className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/home"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Facilities
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/productlist"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Products
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}
