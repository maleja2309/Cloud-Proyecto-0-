import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Categorias from './categorias';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth_token";
import Usuario from "./usuarios";

const TareasList = (props) => {

    const { auth, id_ } = useAuth();
    const [tareasState, setTareasState] = useState({});
    const [v_estado, setEstado] = useState([]);
    const [v_fecha, setFecha] = useState([]);
    const [v_texto, setText] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    const handleEstadoChange = (event, tareaId) => {
        const newState = { ...tareasState };
        newState[tareaId] = {
            ...newState[tareaId],
            estado: event.target.value
        };
        setTareasState(newState);
        setEstado(event.target.value);
    };

    const handleFechaChange = (event, tareaId) => {
        const newState = { ...tareasState };
        newState[tareaId] = {
            ...newState[tareaId],
            fecha_: event.target.value
        };
        setTareasState(newState);
        setFecha(event.target.value);
    };

    const handleTextoChange = (event, tareaId) => {
        const newState = { ...tareasState };
        newState[tareaId] = {
            ...newState[tareaId],
            texto_: event.target.value
        };
        setTareasState(newState);
        setText(event.target.value);
    };

    /*Nueva Tarea */
    const [n_nombre, setNombreC] = useState([]);
    const [n_textoC, setTextC] = useState([]);
    const [n_estado, setEstadoC] = useState([]);
    const [n_fechaF, setFechaC] = useState([]);

    const handleCategoriaChange = (categoria) => {
        setCategorias(categoria.target.value);
    };

    const handleNNombre = (event) => {
        setNombreC(event.target.value);
    }

    const handleNTexto = (event) => {
        setTextC(event.target.value);
    }

    const handleNEstado = (event) => {
        console.log(event.target.value)
        setEstadoC(event.target.value);
    }

    const handleNFecha = (event) => {
        setFechaC(event.target.value);
    }

    /*Nueva Categoria */
    const [n_categoria, setNCategoria] = useState([]);
    const [n_textoCat, setTextCat] = useState([]);

    const handleNCategoria = (event) => {
        console.log(event.target.value)
        setNCategoria(event.target.value);
    }

    const handleTextCat = (event) => {
        setTextCat(event.target.value);
    }

    const [id_categoria, setIdCat] = useState([]);
    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const categoriasPromises = props.tareas.map(async tarea => {
                    try {
                        const response = await fetch(`http://localhost:5000/catTa/${tarea.id}`);
                        const data = await response.json();
                        setIdCat(prevCategorias => ({
                            ...prevCategorias,
                            [tarea.id]: data
                        }));
                    } catch (error) {
                        console.error(`Error al obtener la categoría para la tarea ${tarea.id}:`, error);
                    }
                });
                await Promise.all(categoriasPromises);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };
    
        obtenerCategorias();
    }, [props.tareas]);
    

    return (

        
        <Container>
            <Usuario></Usuario>
 
            <Categorias></Categorias>
            <Row>
                {props.tareas && props.tareas.map(tarea => {
                    const fecha = new Date(tarea.fechaCreacion);
                    const año = fecha.getFullYear();
                    const mes = fecha.getMonth() + 1;
                    const dia = fecha.getDate();

                    const fecha2 = new Date(tarea.fechaFinalizacion);
                    const año2 = fecha2.getFullYear();
                    const mes2 = fecha2.getMonth() + 1;
                    const dia2 = fecha2.getDate();

                    return (
                        <Col key={tarea.id} xs={12} sm={6} md={3} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{tarea.nombre}</Card.Title>
                                    <Card.Subtitle>Fecha Creación: {año}-{mes}-{dia}</Card.Subtitle>
                                    <Card.Text>
                                        Descripción:
                                        <br></br>
                                        {tarea.texto}
                                        <br></br>
                                        Categoria: {id_categoria[tarea.id]}
                                        <br></br>
                                        <Form.Control
                                            id="date"
                                            onChange={(e) => handleTextoChange(e, tarea.id)}
                                            value={tareasState.texto_}
                                            defaultValue={'Nueva descripción'}
                                        />
                                    </Card.Text>

                                    <Form.Select aria-label="Default select example" defaultValue={tarea.estado} onChange={(e) => handleEstadoChange(e, tarea.id)} value={tareasState[tarea.id]}>
                                        <option value={tarea.estado.valor}>{tarea.estado.valor}</option>
                                        <option value="SE">Sin Empezar</option>
                                        <option value="E">Empezada</option>
                                        <option value="T">Terminada</option>
                                    </Form.Select>
                                    <br></br>
                                    <Form.Control
                                        id="date"
                                        onChange={(e) => handleFechaChange(e, tarea.id)}
                                        value={tareasState.fecha_}
                                        defaultValue={`${año2}-${mes2}-${dia2}`}
                                    />
                                    <br></br>
                                    <Button variant="primary"
                                        onClick={async () => {
                                            const response = await fetch("http://localhost:5000/tarea/" + `${id_}`,
                                                {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        "nombre": v_texto,
                                                        "estado": v_estado,
                                                        "fechaFinalizacion": v_fecha
                                                    })
                                                })
                                            if (response.ok) {
                                                console.log('Actualizado');
                                            }
                                        }}
                                    > Guardar Cambios</Button>
                                    <br></br>
                                    <Button variant="outline-danger" size="sm"
                                        onClick={async () => {
                                            const response = await fetch("http://localhost:5000/tarea/" + `${tarea.id}`,
                                                {
                                                    method: 'DELETE',
                                                })
                                            if (response.ok) {
                                                console.log('Eliminado');
                                                window.location.reload();
                                            }
                                        }}
                                    >Eliminar tarea</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <h2>Agregar Tarea</h2>
            <><InputGroup className="mb-3">
                <Button variant="outline-secondary" id="button-addon1">
                    Nombre Tarea
                </Button>
                <Form.Control
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    onChange={handleNNombre}
                    value={n_nombre} />

            </InputGroup>
                <InputGroup className="mb-3">
                    <Button variant="outline-secondary" id="button-addon1">
                        Descripcion
                    </Button>
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        onChange={handleNTexto}
                        value={n_textoC} />

                </InputGroup>
                <InputGroup className="mb-3">
                    <Button variant="outline-secondary" id="button-addon1">
                        Fecha finalizacion
                    </Button>
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        onChange={handleNFecha}
                        value={n_fechaF}
                    />

                </InputGroup>
                <h3>Estado</h3>
                <Form.Select aria-label="Default select example" onChange={handleNEstado}>
                    <option value="SE">Seleccione un estado</option>
                    <option value="SE">Sin Empezar</option>
                    <option value="E">Empezada</option>
                    <option value="F">Finalizada</option>
                </Form.Select>
                <h3>Categoria</h3>
                <InputGroup className="mb-3">
                    <Button variant="outline-secondary" id="button-addon1">
                        Categoria
                    </Button>
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        onChange={handleCategoriaChange}
                        value={categorias}
                    />
                </InputGroup>

                <br></br>
                <Button
                    onClick={async () => {
                        console.log(n_estado);
                        const response = await fetch("http://localhost:5000/usuario/" + `${id_}` + "/" + `${categorias}` + "/tareas",
                            {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${auth}`
                                },
                                body: JSON.stringify({
                                    "nombre": n_nombre,
                                    "texto": n_textoC,
                                    "fechaCreacion": new Date().toISOString().slice(0, 10),
                                    "fechaFinalizacion": n_fechaF,
                                    "estado": n_estado
                                })
                            })
                        if (response.ok) {
                            console.log('Operación exitosa');
                            navigate("/");
                        }
                    }}

                >Registrar Tarea</Button>
                <br></br>
                <br></br>
                <br></br>

                <h2>Nueva categoria</h2>

                <InputGroup className="mb-3">
                    <Button variant="outline-secondary" id="button-addon1">
                        Nombre Categoria
                    </Button>
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        onChange={handleNCategoria}
                        value={n_categoria} />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Button variant="outline-secondary" id="button-addon1">
                        Descripcion
                    </Button>
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        onChange={handleTextCat}
                        value={n_textoCat} />
                </InputGroup>

                <br></br>
                <Button
                    onClick={async () => {
                        console.log(n_estado);
                        const response = await fetch("http://localhost:5000/categorias",
                            {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    "nombre": n_categoria,
                                    "descripcion": n_textoCat
                                })
                            })
                        if (response.ok) {
                            console.log('Operación exitosa');
                            navigate("/");
                        }
                    }}

                >Registrar Categoria</Button>
                 
            </>
            <br></br>

        </Container>
    );
}


export default TareasList;
