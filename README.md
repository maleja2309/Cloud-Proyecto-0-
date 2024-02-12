# Universidad de los Andes
## Departamento de Ingeniería de Sistemas y Computación
### ISIS 4426- Desarrollo de Soluciones Cloud
## Proyecto 0 - Nivelación

----
# Estructura del Repositorio
----
```md
.
| -- Backend
|   |-- imagenes              # En esta carpeta se almacenan las imagenes de los usuarios
|     |-- __init__.py
|   |-- modelos               # Contiene las clases del modelo UML
|     |-- __init__.py
|     |-- modelos.py
|   |-- vistas                # Contiene los request [POST, GET, DELETE, PUT]
|     |-- __init__.py
|     |-- vistas.py
|   |-- __init__.py
|   |-- app.py
  
| -- frontend_
|   |-- src
|     |-- App.js               # Rutas de redirección a las diferentes vistas
|     |-- Auth.py              # Vista de LogIn del usuario
|     |-- Auth_token.py        # Recepción del token del usuario y se deja como variable global {auth}
|     |-- categoria.py         # Se realiza el fetch de las categorias disponibles
|     |-- categorias.py        # Vista de las categorias disponibles
|     |-- Header.py            # Header de la aplicación
|     |-- index.py             # 
|     |-- registrarse.py       # Vista para realizar el SignIn de la aplicación
|     |-- tarea.py             # Se realiza el fetch de las tareas del usuario
|     |-- tareas.py            # Vista principal de la aplicación
|     |-- usuarios.py          # fetch y vista de los datos del usuario
| -- venv                      # Entorno virtual que contiene las librerías de python utilizadas en el Backend
| -- Entrega 0.postman_collection.json # Documentación del API de Postman          
| -- README.md
```
# Documentación Despliegue [Sin contenedores]
-----
1. Backend
   - Opción 1 [Módulos cargaron sin problema]
   a) En la carpeta del back end se encuentra el ambiente virtual, para activarlo utilizar la siguiente instrucción "Backend/venv/Scripts/activate"
   b) En la terminal escribir 'flask run', se debe encontrar en la carpeta del Backend
  - Opción 2
  a) Conectarse al entorno virtual como opción en la opción 1, literal a
  b) Utilizar el comando 'pip install requirements.txt'
  c) En la terminal escribir 'flask run', se debe encontrar en la carpeta del Backend
2. Frontend [React]
  - Necesario:
    * Instalación de Node.js
    * React - Bootstrap
  - npm start:
    * En caso de que alguna librería no cargue correctamente, utilizar el comando npm install "libreria"
3. Postman
  - Ir a la aplicación de Postman en la sección de colecciones
  - Dar clic en importar y subir el archivo .json disponible en el repositorio. Este ya contiene el body y la ruta correspondiente
    * Nota: Se encuentra ejecutandose en el puerto 5000 en el localhost

# Documentación Despliegue [Contenedores]
