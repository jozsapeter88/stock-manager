import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";
import { useAuth } from "../Contexts/AuthContext";

export default function TopNavbar() {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar
        expand="lg"
        variant="light"
        className="navbar"
        data-bs-theme="light"
      >
        <Navbar.Brand as={Link} to={`/facilities/:${user.id}`} style={{ marginLeft: "20px" }}>
          <div className="logo">
            <img
              src={process.env.PUBLIC_URL + "/menulogo.png"}
              alt=""
              height="95"
              width="130"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ fontWeight: "bold" }}
          className="justify-content-end"
        >
          <Nav className="ml-auto">
            {user && user.role === 0 && (
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/admin"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  Admin Page
                </Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item>
              <Nav.Link
                as={Link}
                to={`/orderhistory/${user.id}`}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Order History
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/suppliers"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Suppliers
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/statistics"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Statistics
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/login"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
                onClick={logout}
              >
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}
