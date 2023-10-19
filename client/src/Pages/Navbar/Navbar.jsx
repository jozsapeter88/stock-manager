import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import "./Navbar.css";
import { useAuth } from "../../Contexts/AuthContext";

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
              src={process.env.PUBLIC_URL + "/home-icon.png"}
              alt="home-icon"
              height="80"
              width="80"
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
                to={`/dispatchHistory/${user.id}`}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Dispatch History
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
              <Dropdown>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-basic"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  Logged in as <span style={{ color: "blue" }}>{user.userName}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}
