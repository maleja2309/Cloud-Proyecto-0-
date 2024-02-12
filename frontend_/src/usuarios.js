import Container from "react-bootstrap/esm/Container";
import { useAuth } from "./Auth_token";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Usuario() {
    const { id_ } = useAuth();
    const [usuario, setUsuario] = useState([]);
    const navigate = useNavigate();

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

    const handleCerrarSesion = () => {
        navigate('/'); 
    };


    return (
        <Container>
            <Row>
                <Col>
                    <text>
                    Usuario: {usuario.nombre}
                    </text>
                </Col>
                <Col>
                <Button onClick={handleCerrarSesion}>
                Cerrar Sesión
                </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Usuario;
