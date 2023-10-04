import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import "./SignIn.css";

const SignIn = ({ onSubmit, showMsg, rememberMe, handleRememberMeChange }) => {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={4} lg={6} xs={12}>
            <img
              src={process.env.PUBLIC_URL + "/newlogo_transparent.png"}
              alt="img"
              className="img-fluid"
              style={{
                marginLeft: "",
                maxWidth: "600px",
                maxHeight: "600px",
              }}
            />{" "}
          </Col>
          <Col md={8} lg={6} xs={12}>
            <div className="border border-0 border-primary"></div>
            <Card className="shadow opacity">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2">Welcome!</h2>
                  <p className=" mb-5">
                    Please enter your username and password:
                  </p>
                  <div className="mb-3">
                    <Form onSubmit={onSubmit}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicUsername"
                      >
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          type="input"
                          placeholder="Enter Username"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      > <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                  /></Form.Group>
                      <div className="d-grid">
                        <Button variant="warning" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p
                        className="mb-0  text-center"
                        style={{ visibility: !showMsg ? "visible" : "hidden" }}
                        id="not-valid"
                      >
                        Username or password not valid.
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="/register" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default SignIn;
