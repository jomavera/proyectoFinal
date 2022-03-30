"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User, Evento, Categoria, Locacion, Funcion
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from datetime import datetime
from flask_jwt_extended import current_user

api = Blueprint('api', __name__)



@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():
    try:
       
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        #data = User.query.get(user_id)
        print(user.name,"data")
        response_body = {
        "email": user.email,
        "name": user.name,
        "lastname": user.lastname
         }
        return jsonify(response_body), 200
    except Exception as e:
        print("ERROR! "f'{e}')
     

@api.route("/aaa", methods=["GET"])
@jwt_required()
def protected():
     try:
        print(current_user_id)
    # Accede a la identidad del usuario actual con get_jwt_identity

        current_user_id = get_jwt_identity()
        user = User.query.filter_by(email=current_user_id).first() 
        user = User.query.all(current_user_id)
        return jsonify({"id": user.id, "name": user.name }), 200
     except Exception as e:
        print("ERROR! "f'{e}')

@api.route('/user', methods=['GET'])
def get_user():
    try:
        response_body = ([{
            '_id': user.id,
            'name': user.name,
            'lastname': user.lastname,
            'email': user.email,
            'is_active': user.is_active
        } for user in User.query.all()
        ])
        return jsonify(response_body), 200
    except Exception as e:
        print("ERROR! "f'{e}')


@api.route('/new_user', methods=['POST'])
def new_user():
    try:
        name = request.json.get("name", None)
        lastname = request.json.get("lastname", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        is_active = request.json.get("is_active", None)
        # if is_active.lower() == 'true':
        #     is_active = True
        # if is_active.lower()== 'false': 
        #     is_active = False
        userR = User.query.filter_by(email=email).first()
        if userR: 
            return {
            'Error':'Correo ya registrado'
            } 
        user = User(name=name, lastname=lastname, email=email, password=password, is_active=True)
        db.session.add(user)
        db.session.commit()
        return {
            'mensaje':'ok'
        }, 200   
    except Exception as e:
        print(f'new_user_ERROR: {e}')
        return (f'new_user_ERROR: {e}'), 500


@api.route('/perfil/<name>')
def success(name):
   return 'welcome %s' % name


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    try:
        name = request.json.get('name', None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        user = User.query.filter_by(email=email, password=password).first() 
        if user is None:
            return jsonify({"msg": "Bad username or password"}), 401
           
        access_token = create_access_token(identity=user.id)
        return jsonify({ "access_token": access_token, "user_id": user.id })
    except Exception as e:
        print(f'ERROR CREATE_TOKEN: {e}')
        return 'ERROR', 500

@api.route('/nuevo_evento', methods=['POST'])
def new_event():
    try:
        name = request.json.get("name", None)
        categoria_id= request.json.get("categoria_id", None)
        locacion_id = request.json.get("locacion_id", None)
        descripcion = request.json.get("descripcion", None)
        sinopsis = request.json.get("sinopsis", None)
        precio = request.json.get("precio", None)
        duracion = request.json.get("duracion", None)
        imagen = request.json.get("imagen", None)
        is_active = request.json.get("is_active", None)

        evento = Evento(name, categoria_id, locacion_id, descripcion, sinopsis, precio, duracion, imagen)
        db.session.add(evento)
        db.session.commit()

        return {
            'mensaje':'ok',
            'id':evento.id
        }, 200
        
    except Exception as e:
        print(f'Error nuevo evento : {e}')
        return 'ERROR', 500

@api.route('/eventos', methods=['GET'])
def get_events():
    try:
        response_body = ([{
            'id': evento.id,
            'titulo': evento.name,
            'categoria_id': evento.categoria_id,
            'locacion_id': evento.locacion_id,
            'descripcion': evento.descripcion,
            'sinopsis': evento.sinopsis,
            'precio': evento.precio,
            'imagen':evento.imagen,
            'duracion':evento.duracion,
            'is_active': evento.is_active
        } for evento in Evento.query.filter_by(is_active=True)
        ])
        return jsonify(response_body), 200
        
    except Exception as e:
        print(f'get events error: {e}')
        return 'ERROR', 500

@api.route('/evento/<int:theid>', methods=['GET'])
def get_evento(theid):
    try:
        response_body = ([{
            'id': evento.id,
            'titulo': evento.name,
            'categoria_id': evento.categoria_id,
            'locacion_id': evento.locacion_id,
            'descripcion': evento.descripcion,
            'sinopsis': evento.sinopsis,
            'precio': evento.precio,
            'imagen':evento.imagen,
            'duracion':evento.duracion,
            'is_active': evento.is_active
        } for evento in Evento.query.filter_by(id=theid)
        ])
        return jsonify(response_body), 200
        
    except Exception as e:
        print(f'get events error: {e}')
        return 'ERROR', 500

@api.route('/evento_name/<name>', methods=['GET'])
def get_evento_name(name):
    try:
        response_body = ([{
            'id': evento.id,
            'titulo': evento.name,
            'categoria_id': evento.categoria_id,
            'locacion_id': evento.locacion_id,
            'descripcion': evento.descripcion,
            'sinopsis': evento.sinopsis,
            'precio': evento.precio,
            'imagen':evento.imagen,
            'duracion':evento.duracion,
            'is_active': evento.is_active
        } for evento in Evento.query.filter_by(name=name)
        ])
        return jsonify(response_body), 200
        
    except Exception as e:
        print(f'get event name error: {e}')
        return 'ERROR', 500

@api.route('/nueva_categoria', methods=['POST'])
def new_category():
    try:
        name = request.json.get("name", None)
        query = Categoria.query.filter_by(name=name)
        results = list(map(lambda x: x.serialize(), query))
        if results == []:
            categoria = Categoria(name)
            db.session.add(categoria)
            db.session.commit()

        return {
            'mensaje':'ok'
        }, 200
        
    except Exception as e:
        print(f'Error nueva categoria : {e}')
        return 'ERROR', 500

@api.route('/nueva_locacion', methods=['POST'])
def new_location():
    try:
        name = request.json.get("name", None)
        query = Locacion.query.filter_by(name=name)
        results = list(map(lambda x: x.serialize(), query))
        if results == []:
            locacion = Locacion(name)
            db.session.add(locacion)
            db.session.commit()

        return {
            'mensaje':'ok'
        }, 200
        
    except Exception as e:
        print(f'Error nueva locacion : {e}')
        return 'ERROR', 500

@api.route('/locacion/<name>', methods=['GET'])
def get_location(name):
    try:
        response_body = ([{
            '_id': locacion.id,
            'name': locacion.name,

        } for locacion in Locacion.query.filter_by(name=name)
        ])
        return jsonify(response_body), 200
        
    except Exception as e:
        print(f'get locacion error: {e}')
        return 'ERROR', 500

@api.route('/locacion_id/<int:theid>', methods=['GET'])
def get_location_id(theid):
    try:
        response_body = ([{
            '_id': locacion.id,
            'name': locacion.name,

        } for locacion in Locacion.query.filter_by(id=theid)
        ])
        return jsonify(response_body), 200
        
    except Exception as e:
        print(f'get locacion error: {e}')
        return 'ERROR', 500

@api.route('/categoria/<name>', methods=['GET'])
def get_categoria(name):
    try:
        response_body = ([{
            '_id': categoria.id,
            'name': categoria.name,

        } for categoria in Categoria.query.filter_by(name=name)
        ])
        return jsonify(response_body), 200
        
    except Exception as e:
        print(f'get category error: {e}')
        return 'ERROR', 500

@api.route('/nueva_funcion', methods=['POST'])
def new_function():
    try:
        evento_id = request.json.get("evento_id", None)
        fecha = request.json.get("fecha", None)
        hora = request.json.get("hora", None)

        funcion = Funcion(evento_id, datetime.strptime(fecha, "%a, %d %b %Y %H:%M:%S %Z"), hora)
        db.session.add(funcion)
        db.session.commit()

        return {
            'mensaje':'ok'
        }, 200
        
    except Exception as e:
        print(f'Error nueva funcion : {e}')
        return 'ERROR', 500

@api.route('/funciones/<int:evento_id>', methods=['GET'])
def get_functions(evento_id):
    try:
        response_body = ([{
            'id': funcion.id,
            'evento_id': funcion.evento_id,
            'fecha':funcion.fecha,
            'hora': funcion.hora,

        } for funcion in Funcion.query.filter_by(evento_id=evento_id)
        ])
        return jsonify(response_body), 200
        
    except Exception as e:
        print(f'get functions error: {e}')
        return 'ERROR', 500

@api.route('/horas/<int:evento_id>/<fecha>', methods=['GET'])
def get_function_hour(evento_id, fecha):
    try:

        response_body = ([{
            'hora': funcion.hora,
        } for funcion in Funcion.query.filter_by(evento_id=evento_id, fecha=fecha)
        ])
        return jsonify(response_body), 200

    except Exception as e:
        print(f'get function hour error: {e}')
        return 'ERROR', 500

@api.route("/hitorial", methods=["GET"])
def handle_historial():
    return  {
        "mess":"mensaje"
    }

