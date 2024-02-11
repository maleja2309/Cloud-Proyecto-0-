from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields
import enum
from datetime import datetime

db = SQLAlchemy()

class Usuario(db.Model):
    """ 
    Crea un usuario con los siguientes atributos:
        - nombre: Nombre del usuario
        - contraseña: Contraseña seleccionada por el usuario
        - imagen: Foto de perfil subida por el usuario
    """

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(20), unique=True, nullable= False)
    contrasena = db.Column(db.String(), nullable= False)
    imagen = db.Column(db.String())
    tareas = db.relationship("Tarea", cascade="all, delete, delete-orphan")

#================================================================================#
class Estado(enum.Enum):
    SE = "Sin empezar"
    E = "Empezada"
    F = "Finalizada"

class Tarea(db.Model):
    """
    Creación de una tarea con los siguientes atributos:

        - nombre: Nombre de la tarea
        - texto: Descripción de la tarea
        - fechaCreacion: Fecha en la que se creo la tarea
        - fechaFinalizacion: Fecha en la que se finalizó la tarea
        - estado: Estado de la tarea [Sin empezar, Empezada, Finalizada]
    """
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(50))
    texto = db.Column(db.String(1000))
    fechaCreacion = db.Column(db.DateTime(), 
                              default=datetime.now().strftime('%Y-%m-%d')) # Reivsar después
    fechaFinalizacion = db.Column(db.DateTime())
    estado = db.Column(db.Enum(Estado))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    categoria = db.Column(db.Integer, db.ForeignKey("categoria.id"))

#================================================================================#
class Categoria(db.Model):
    """
    Creación de una categoría:
        - nombre: Nombre de la categoría
        - descripcion: Descripción de la categoría
    """
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(20))
    descripcion = db.Column(db.String(200))
    tareas = db.relationship("Tarea", cascade="all, delete, delete-orphan")
    

#================================================================================#
# Realizar serialización
    
class EnumADiccionario(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return {"llave":value.name, 'valor':value.value}

# ===== Realizar schemas ===== #
    
class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario
        include_relationships = True
        load_instance = True

class TareaSchema(SQLAlchemyAutoSchema):
    estado = EnumADiccionario(attribute=("estado"))
    class Meta:
        model = Tarea
        include_relationships = True
        load_instance = True

class CategoriaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Categoria
        include_relationships = True
        load_instance = True
