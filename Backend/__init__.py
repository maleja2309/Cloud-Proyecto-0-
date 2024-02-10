from flask import Flask , make_response
from flask_cors import CORS

def create_app(config_name):
    app = Flask(__name__)
    CORS(app)
    #app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:0000@localhost:5432'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    #app.config['JWT_SECRET_KEY'] = "por colocar"
    #app.config['PROPAGATE_EXCEPTIONS'] = True

    return app



