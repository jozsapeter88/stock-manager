import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import "./SignUp.css"

export default function SignUp({onSubmit, showMsg, successfulReg}) {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={4} lg={6} xs={12}>
            <img src="https://i.imgur.com/S0upujn.png" alt="img" className="img-fluid"  style={{ marginLeft: '-10rem'}}/>
          </Col>
          <Col md={8} lg={6} xs={12}>
            <div className="border border-0 border-primary"></div>
            <Card className="shadow opacity">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2">Sign up</h2>
                  <p className=" mb-5" ></p>
                  <div className="mb-3">
                    <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center" >
                          Email
                        </Form.Label>
                        <Form.Control type="input" placeholder="Enter email" style={{borderColor: showMsg ? '' : 'red'}}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label className="text-center" >
                          Username
                        </Form.Label>
                        <Form.Control type="input" placeholder="Enter username" style={{borderColor: showMsg ? '' : 'red'}}/>
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
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="warning" type="submit">
                            Sign Up
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3" >
                    <p className="mb-0  text-center" hidden={showMsg} id="not-valid">
                        Username is already taken.
                      </p>
                    <p className="mb-0  text-center" hidden={!successfulReg} id="valid">
                        Successful registration!
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <a href="/" className="text-primary fw-bold">
                          Sign in
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
}
