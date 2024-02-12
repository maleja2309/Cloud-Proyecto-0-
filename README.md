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
# Documentación Despliegue 
-----
1. Backend
   - Opción 1 [Módulos cargaron sin problema]
   a) En la carpeta del back end se encuentra el ambiente virtual, para activarlo utilizar la siguiente instrucción "Backend/venv/Scripts/activate"
   b) En la terminal escribir 'flask run', se debe encontrar en la carpeta del Backend
  - Opción 2
  a) Conectarse al entorno virtual como opción en la opción 1, literal a
  b) Utilizar el comando 'pip install requirements.txt'
  c) En la terminal escribir 'flask run', se debe encontrar en la carpeta del Backend
  Nota: Se utilizó una base de datos de PostgreSQL con las siguientes credenciales:
    * usuario: postgres
    * contraseña: 0000
  Esta se puede cambiar en la ruta
  
  ```md
  | -- Backend
  |   |-- imagenes              # En esta carpeta se almacenan las imagenes de los usuarios
  |     |-- __init__.py
  |   |-- modelos               # Contiene las clases del modelo UML
  |     |-- __init__.py
  |     |-- modelos.py
  |   |-- vistas                # Contiene los request [POST, GET, DELETE, PUT]
  |     |-- __init__.py
  |     |-- vistas.py
  |   |-- __init__.py <- Este Archivo
  |   |-- app.py
  ```
2. Frontend [React]
  - Necesario:
    * Instalación de Node.js
    * React - Bootstrap
  - npm start:
    * En caso de que alguna librería no cargue correctamente, utilizar el comando npm install "libreria"
  - Se despliega en el puerto 3000
3. Postman
  - Ir a la aplicación de Postman en la sección de colecciones
  - Dar clic en importar y subir el archivo .json disponible en el repositorio. Este ya contiene el body y la ruta correspondiente
    * Nota: Se encuentra ejecutandose en el puerto 5000 en el localhost

---

# Uso de la aplicación

Pantalla 1: LogIn y SignUp
![image](https://github.com/maleja2309/Cloud-Proyecto-0-/assets/69637081/6543327e-bc7d-4444-9917-7517877bf0be)
1) Crear un nuevo usuario. No se arroja un mensaje de confirmación, pero este sí se agrega.
2) Una vez creado el usuario, introducir los datos y darle clic al botón de *ingresar*

Pantalla 2: Tareas
![image](https://github.com/maleja2309/Cloud-Proyecto-0-/assets/69637081/8326ea8b-4fc2-4bdb-bb52-a1d4a9427330)
En esta vista se encuentran las tareas del usuario, en la parte superior está su nombre y al lado un botón para poder cerrar sesión. 
- Para modificar tareas:
  * ![image](https://github.com/maleja2309/Cloud-Proyecto-0-/assets/69637081/42bcb326-5793-4c39-85d7-3fcb8ae68a0d)
    
  **Importante:**
    (1) Para realizar el PUT de las tareas, en estas se deben actualizar **todos** los campos. En caso de solo cambiar una casilla, colocar los mismos valores en los demás para que se actualicen todos los espacios dentro del front para enviar la petición al back. 
    (2) Dar clic en el botón *Guardar Cambios*
    
- Eliminar una tarea:
  * Dar clic en el botón *Eliminar tarea*
 
- Eliminar una cateogoría
  * Dar clic en el botón eliminar en la parte superior debajo del nombre de las categorías disponibles 
 
#### Nueva Tarea
1) Para agregar una nueva tarea se debe comprobar que hayan categorías, estas se encuentran en la parte superior y en el campo categoría se debe colocar el número correspondiente. Es decir. Con la imagen anterior la úica categoría que se tiene es *Hogar* con un identificador de 1.
2) La fecha se debe ingresar en formato YYYY-MM-DD
3) Por último, se da clic en el botón *Registrar tarea*
4) **NOTA:** Se redirecciona a la página de login, en este se deben ingresar nuevamente las credenciales para poder encontrar la tarea.
A continuación se muestra un ejemplo:

![image](https://github.com/maleja2309/Cloud-Proyecto-0-/assets/69637081/90059493-f73d-430d-818e-1c6de671b4c4)

#### Nueva Categoria 
1) Ingresar el nombre y la descripción de la categoría
2) Ingresar nuevamente desde el login para poder ver la nueva categoría
![image](https://github.com/maleja2309/Cloud-Proyecto-0-/assets/69637081/acad23b2-4694-4e32-8353-86cbbe7277ec)





