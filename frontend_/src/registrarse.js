import React from "react";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import ImageUploading from "react-images-uploading";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Registro() {

    /* Código para subir la imagen tomado de la documentación de npm
    https://www.npmjs.com/package/react-images-uploading
    */

    const [images, setImages] = useState([]);
    const [new_user, setNewU] = useState([]);
    const [new_pass, setNewP] = useState([]);
    const navigate = useNavigate();

    const maxNumber = 1;

    const onChange = async (imageList) => {
        try {
            if (imageList.length > 0) {
                const image = imageList[0];

                const formData = new FormData();
                const extension = image.file.name.split('.').pop().toLowerCase();

                // Verificar si la extensión es válida
                if (['jpg', 'jpeg', 'png', 'gif', 'img'].includes(extension)) {
                    formData.append('image', image.file, `${new_user}.${extension}`);
                } else {
                    console.error('Formato de archivo no permitido');
                    return;
                }

                // Enviar la imagen al servidor y guardarla en la carpeta 'images' dentro
                const response = await axios.post('http://localhost:5000/foto', formData);

                // Lograr la respuesta del servidor
                console.log('Response:', response);

                // Establecer las imágenes
                setImages(extension);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleNUserChange = (event) => {
        setNewU(event.target.value);
        console.log(event.target.value);
    }

    const handleNPassChange = (event) => {
        setNewP(event.target.value);
        console.log(event.target.value);
    }

    return (
        <Row>
            <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Nuevo nombre de usuario"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handleNUserChange}
                        value={new_user}
                    />
                </InputGroup>
            </Col>
            <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">P</InputGroup.Text>
                    <Form.Control
                        placeholder="Nueva contraseña"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        type="password"
                        onChange={handleNPassChange}
                        value={new_pass}
                    />
                </InputGroup>
            </Col>

            <Col>
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <Button
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Cargue su imagen de perfil
                            </Button>
                        </div>
                    )}
                </ImageUploading>
            </Col>

            <Col>
                <Button
                    variant="primary"
                    size="m"
                    onClick={async () => {
                        var im = `/imagenes/${new_user}.${images}`;
                        if (`${images}` === "") {
                            im = `/imagenes/default.jpg`;
                        }
                        const response = await fetch("http://localhost:5000/usuario",
                            {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "nombre": new_user,
                                    "contrasena": new_pass,
                                    "imagen": im
                                })
                            })
                        if (response.ok) {
                            console.log('Registrado');
                            navigate("/");
                        }
                        else {
                            alert('Seleccione otro nombre de usuario, ese ya se encuentra en nuestro sistema');
                        }
                    }}
                >
                    Registrase
                </Button>

            </Col>
        </Row>
    )
}


export default Registro;