import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const CategoriaList = (props) => {
  const navigate = useNavigate();
  return (

    <Container>
      <br></br>
      <Nav justify variant="tabs" defaultActiveKey="/home" >
        {props.categorias && props.categorias.map(categoria => (
          <Nav.Item key={categoria.id}>
            <Nav.Link href={`/tareas/${categoria.id}`}>{categoria.nombre}</Nav.Link>

            <span style={{ fontSize: '0.8rem', display: 'block' }}>{categoria.descripcion}</span>
            <span style={{ fontSize: '0.8rem', display: 'block' }}>{categoria.id}</span>
            <Button variant="outline-danger" size="sm"
              onClick={async () => {
                console.log(`${categoria.id}`)
                const response = await fetch("http://localhost:5000/categorias/" + `${categoria.id}`,
                  {
                    method: 'DELETE',
                    mode:'cors'
                  })
                if (response.ok) {
                  console.log('Eliminado');
                  navigate("/");
                }
              }}
            >Eliminar</Button>
          </Nav.Item>
        ))}
      </Nav>
      <br></br>

    </Container>

  );
}
export default CategoriaList;

