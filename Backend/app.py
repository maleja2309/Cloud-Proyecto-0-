from  Backend import create_app
from flask_restful import Api
from .modelos import db, Usuario, Tarea, Estado, Categoria
from .vistas import *

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

# Rutas para el API
api = Api(app)

# Usuario
api.add_resource(vistaLogIn, "/usuario/iniciar-sesion")
api.add_resource(vistaSignIn, "/usuarios")
api.add_resource(vistaUsuario, "/usuario/<int:id_usuario>")

# Categoria
api.add_resource(vistaCategoria, "/categorias/<int:id_categoria>")
api.add_resource(vistaCategorias, "/categorias")
api.add_resource(vistaTareasCategoria, "/tareas/<int:id_usuario>/<int:id_categoria>")

# Tareas
api.add_resource(vistaTarea, "/tarea/<int:id_tarea>")
api.add_resource(vistaTareasUsuario, "/usuario/<int:id_usuario>/<int:id_categoria>/tareas")
api.add_resource(vistaTareaUsuario, "/tareas/<int:id_usuario>")
