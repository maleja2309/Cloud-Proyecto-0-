from flask_restful import Resource
from ..modelos import db, Usuario, UsuarioSchema, Tarea, TareaSchema, Categoria, CategoriaSchema
from flask import render_template, request, redirect, url_for, current_app
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from ..imagenes import photos
from flask_uploads import UploadNotAllowed
from flask_jwt_extended import jwt_required, create_access_token


usuario_schema = UsuarioSchema()
tarea_schema = TareaSchema()
categoria_schema = CategoriaSchema()

## Usuario
# Crear usuario [POST]
class vistaSignIn(Resource):
    def post(self):
        nombre_usuario = request.json["nombre"]
        nuevo_usuario = Usuario(nombre=request.json['nombre'],
                                contrasena=request.json['contrasena'],
                                imagen=request.json['imagen'])
        usuario = Usuario.query.filter_by(nombre=nombre_usuario).first()
        if usuario:
            print(nombre_usuario)
        
            return {"mensaje": "El nombre ya está en uso, utilice otro nombre"}, 409
        else:
            db.session.add(nuevo_usuario)
            db.session.commit()
            return usuario_schema.dump(nuevo_usuario), 201
        
    def get(self):
        return [usuario_schema.dump(usuarios) for usuarios in Usuario.query.all()]

class vistaUsuario(Resource):
    def get(self, id_usuario):
        return usuario_schema.dump(Usuario.query.get_or_404(id_usuario))

# Iniciar sesión [POST]
class vistaLogIn(Resource):
    def post(self):
        u_nombre = request.json["nombre"]
        u_contrasena = request.json["contrasena"]
        usuario = Usuario.query.filter_by(nombre= u_nombre, 
                                          contrasena= u_contrasena)
        if usuario:
            return {'mensaje': 'Inicio de sesión exitoso'},200
        else:
            return {'mensje':'Nombre de usuario o contrasea incorrectos'},401

## Tareas
class vistaTareasUsuario(Resource):
# Creación de una tarea [POST]
    def post(self, id_usuario, id_categoria):
        nueva_tarea = Tarea(nombre=request.json["nombre"],
                            texto=request.json["texto"],
                            fechaCreacion=datetime.strptime(request.json["fechaCreacion"], '%Y-%m-%d'),
                            fechaFinalizacion=datetime.strptime(request.json["fechaFinalizacion"], '%Y-%m-%d'),
                            estado=request.json["estado"])
        usuario = Usuario.query.get_or_404(id_usuario)
        categoria = Categoria.query.get_or_404(id_categoria)

        categoria.tareas.append(nueva_tarea)
        usuario.tareas.append(nueva_tarea)

        try:
            db.session.commit()
            return {'mensaje': 'Tarea agregada exitosamente'},200
        except Exception as e:
            db.session.rollback()
            current_app.logger.error(e, exc_info=True)
            return {'mensaje': 'Ocurrió un problema'}, 409  

class vistaTarea(Resource):
# Actualizar tarea [PUT]
    def put(self, id_tarea):
        tarea = Tarea.query.get_or_404(id_tarea)
        tarea.texto = request.json.get("texto", tarea.texto)
        tarea.fechaFinalizacion = request.json.get("fechaFinalizacion", tarea.fechaFinalizacion)
        tarea.estado = request.json.get("estado", tarea.estado)
        db.session.commit()
        return {'mensaje':' Modificado de forma correcta'}, 200
    
# Eliminar tarea [DELETE]
    def delete(self, id_tarea):
        tarea = Tarea.query.get_or_404(id_tarea)
        db.session.delete(tarea)
        db.session.commit()
        return "Tarea eliminada correctamente", 204
    
# Obtener tareas por id [GET]
    def get(self, id_tarea):
        return tarea_schema.dump(Tarea.query.get_or_404(id_tarea)),201

class vistaTareaUsuario(Resource):
# Obtener tareas por usuario [GET]
    def get(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        return [tarea_schema.dump(al) for al in usuario.tareas]

## Categorias
class vistaTareasCategoria(Resource):
    def get(self, id_usuario, id_categoria):
        categoria = Categoria.query.get_or_404(id_categoria)
        usuario = Usuario.query.get_or_404(id_usuario)
        return [tarea_schema.dump(al) for al in (categoria.tareas and usuario.tareas)]

# Crear categoría [POST]
class vistaCategoria(Resource):
# Eliminar categoria [DELETE]
    def delete(self, id_categoria):
        categoria = Categoria.query.get_or_404(id_categoria)
        db.session.delete(categoria)
        db.session.commit()
        return "Categoria eliminada correctamente", 204

class vistaCategorias(Resource):
# Obtener lista de categorias [GET]
    def get(self):
        return [categoria_schema.dump(categoria) for categoria in Categoria.query.all()], 200

# Crear categoria [POST]
    def post(self):
        nueva_categoria = Categoria(nombre=request.json["nombre"],
                                    descripcion=request.json["descripcion"])
        db.session.add(nueva_categoria)
        db.session.commit()
        return categoria_schema.dump(nueva_categoria), 201


