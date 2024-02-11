import Authentication from "./Auth.js";
import Container from 'react-bootstrap/Container';
import Registro from "./registrarse.js";

function LogIn()
{
return (
    <Container>
        <h2>
            Iniciar Sesión
        </h2>
        <br></br>
    <Authentication></Authentication>

    <p>Sino hace parte de nuestra comunidad:
        <br></br>
        (1) De un nombre de usuario 
        <br></br>
        (2) Escriba su contraseña
        <br></br>
        (3) Es opcional subir una foto de perfil
        <br></br>
        (4) De clic en el botón de registrar
    </p>

    <Registro></Registro>

    </Container>

   
)
}

export default LogIn;