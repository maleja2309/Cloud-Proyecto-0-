import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Header() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={"http://localhost:3000/tareas/"}>
          <h1>Tareas</h1>
        </Navbar.Brand>
        <Nav>
          
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;


