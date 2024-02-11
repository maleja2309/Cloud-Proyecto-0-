import React from "react";
import { useState} from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import { useAuth} from "./Auth_token";

function Authentication()
{
  const { login } = useAuth();
  const [user, setUser] = useState([]);
  const [pass, setPass] = useState([]);

  const handleUserChange = (event) =>
  {
      setUser(event.target.value);
  }

  const handlePassChange = (event) =>
  {
      setPass(event.target.value);
  }

  const handleLogIn = async () => {
    await login({ nombre: user, contrasena: pass });
  };

    return (
        <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={handleUserChange}
                  value={user}
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">P</InputGroup.Text>
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  type="password"
                  aria-describedby="basic-addon1"
                  onChange={handlePassChange}
                  value={pass}
                />
              </InputGroup>
            </Col>
            <Col>
              <Button variant="primary" size="m" onClick={handleLogIn}>
                Ingresar
              </Button>
            </Col>
          </Row>
      );
    }
    
export default Authentication;
