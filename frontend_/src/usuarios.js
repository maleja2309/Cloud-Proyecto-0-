import Container from "react-bootstrap/esm/Container";
import { useAuth } from "./Auth_token";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function Usuario() {
    const { id_ } = useAuth();
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/usuario/" + id_,
            {
                'methods': 'GET',
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => setUsuario(response))
            .catch(error => console.log(error))
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <text>
                    Usuario: {usuario.nombre}
                    </text>
                </Col>
            </Row>
        </Container>
    );
}

export default Usuario;
