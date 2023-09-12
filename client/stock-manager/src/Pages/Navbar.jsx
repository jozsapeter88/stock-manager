import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";
import { useAuth } from "../Contexts/AuthContext";

export default function TopNavbar() {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <Navbar
        expand="lg"
        variant="light"
        className="navbar"
        data-bs-theme="light"
      >
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
                to="/home"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Facility List
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
               Product List
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/order-history"
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
                to={`/facilities/:${user.id}`}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                MyFacilities
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}
