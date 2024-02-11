from flask import Flask, request
from flask_cors import CORS
from flask_uploads import IMAGES, UploadSet, UploadNotAllowed

def create_app(config_name):
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:0000@localhost:5432'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_PATH'] = './imagenes'

    photos = UploadSet("photos", IMAGES)
    
    @app.route("/foto",methods=["POST","GET"])
    def upload():
        try:
            if request.method=='POST':
                # print("request",request.form)
                image=request.files['image']
                image_name=image.filename
                if '.jpg' in image_name:
                    image.save('imagenes/'+image_name)
                    return {"response":"file saved successfully in your current durectory"}
                elif '.jpeg' in image_name: 
                    image.save('imagenes/'+image_name)
                    return {"response":"file saved successfully in your current durectory"}
                else:
                    return {"error":"select you image file"}
        except Exception as e:
            return {"error":str(e)}
    return app

"""
El código para la carga de imagenes se tomó de:
https://galaxyofai.com/how-to-send-image-files-to-flask-api-using-postman/
"""