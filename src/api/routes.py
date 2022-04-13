"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User, Evento, Categoria, Locacion, Funcion, Compra, Ticket
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from datetime import datetime
from flask_jwt_extended import current_user

import itertools
import mercadopago

sdk = mercadopago.SDK(
    "TEST-7001770905886777-033114-c013ded5a4474fb975d52204f2288764-1098699850"
)


api = Blueprint("api", __name__)


@api.route("/hello", methods=["GET"])
@jwt_required()
def handle_hello():
    try:

        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        # data = User.query.get(user_id)
        print(user.name, "data")
        response_body = {
            "email": user.email,
            "name": user.name,
            "lastname": user.lastname,
        }
        return jsonify(response_body), 200
    except Exception as e:
        print("ERROR! " f"{e}")


@api.route("/user", methods=["GET"])
def get_user():
    try:
        response_body = [
            {
                "_id": user.id,
                "name": user.name,
                "lastname": user.lastname,
                "email": user.email,
                "is_active": user.is_active,
            }
            for user in User.query.all()
        ]
        return jsonify(response_body), 200
    except Exception as e:
        print("ERROR! " f"{e}")


@api.route("/new_user", methods=["POST"])
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
            return {"Error": "Correo ya registrado"}
        user = User(
            name=name, lastname=lastname, email=email, password=password, is_active=True
        )
        db.session.add(user)
        db.session.commit()
        return {"mensaje": "ok"}, 200
    except Exception as e:
        print(f"new_user_ERROR: {e}")
        return (f"new_user_ERROR: {e}"), 500


@api.route("/perfil/<name>")
def success(name):
    return "welcome %s" % name


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    try:
        name = request.json.get("name", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        user = User.query.filter_by(email=email, password=password).first()
        if user is None:
            return jsonify({"msg": "Bad username or password"}), 401

        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token, "user_id": user.id})
    except Exception as e:
        print(f"ERROR CREATE_TOKEN: {e}")
        return "ERROR", 500


@api.route("/nuevo_evento", methods=["POST"])
def new_event():
    try:
        name = request.json.get("name", None)
        categoria_id = request.json.get("categoria_id", None)
        locacion_id = request.json.get("locacion_id", None)
        descripcion = request.json.get("descripcion", None)
        sinopsis = request.json.get("sinopsis", None)
        precio = request.json.get("precio", None)
        duracion = request.json.get("duracion", None)
        imagen = request.json.get("imagen", None)
        is_active = request.json.get("is_active", None)

        evento = Evento(
            name,
            categoria_id,
            locacion_id,
            descripcion,
            sinopsis,
            precio,
            duracion,
            imagen,
        )
        db.session.add(evento)
        db.session.commit()

        return {"mensaje": "ok", "id": evento.id}, 200

    except Exception as e:
        print(f"Error nuevo evento : {e}")
        return "ERROR", 500


@api.route("/eventos", methods=["GET"])
def get_events():
    try:
        #event = request.args.get['evet']
        categoria= request.args.get('categoria', None)
        filtro= request.args.get('filtro', None)
        print(categoria,"Categoria")
        print(filtro,"filtro")
        if categoria == '0':
            print("entro al if")
            join_query = db.session.query(Evento, Categoria, Evento.is_active, Locacion)\
            .join(Evento, Evento.categoria_id == Categoria.id)\
            .join(Locacion, Locacion.id == Evento.locacion_id)
            print(join_query, "del if 0")
            response_body = []
            for elemento in tuple(join_query):
                print(elemento)
                categoria_id = elemento['Categoria'].id
                nombre_categoria = elemento['Categoria'].name             
                name = elemento['Evento'].name
                descripcion = elemento['Evento'].descripcion
                id = elemento['Evento'].id
                sinopsis = elemento['Evento'].sinopsis
                locacion_id = elemento['Evento'].locacion_id
                precio = elemento['Evento'].precio
                imagen = elemento['Evento'].imagen
                duracion = elemento['Evento'].duracion
                nombre_locacion = elemento['Locacion'].name
                is_active = elemento['Evento'].is_active
              
                objeto = ({
                "id": id,
                "titulo": name,
                "nombre_categoria": nombre_categoria,
                "descripcion": descripcion,
                "categoria_id": categoria_id,
                "locacion_id": locacion_id,
                "sinopsis": sinopsis,
                "precio": precio,
                "imagen": imagen,
                "duracion": duracion,
                "is_active": is_active,
                "nombre_locacion": nombre_locacion,
        
                 })
                
                response_body.append(objeto)
            return jsonify(response_body), 200
        

 
        print(categoria,"no entro al if")
        join_query = db.session.query(Evento, Categoria, Evento.is_active)\
            .join(Evento, Evento.categoria_id == Categoria.id)\
        .filter_by(categoria_id=filro).filter_by(is_active=True)

    
        response_body = []
        for elemento in tuple(join_query):
            categoria_id = elemento['Categoria'].id
            nombre_categoria = elemento['Categoria'].name             
            name = elemento['Evento'].name
            descripcion = elemento['Evento'].descripcion
            id = elemento['Evento'].id
            sinopsis = elemento['Evento'].sinopsis
            locacion_id = elemento['Evento'].locacion_id
            precio = elemento['Evento'].precio
            imagen = elemento['Evento'].imagen
            duracion = elemento['Evento'].duracion
            nombre_locacion = elemento['Locacion'].name
            is_active = elemento['Evento'].is_active
            print(elemento)
            

            objeto = ({
                "id": id,
                "titulo": name,
                "descripcion": descripcion,
                "categoria_id": categoria_id,
                "locacion_id": locacion_id,
                "descripcion": descripcion,
                "sinopsis": sinopsis,
                "precio": precio,
                "imagen": imagen,
                "duracion": duracion,
                "is_active": is_active
            
            })
            response_body.append(objeto)
        return jsonify(response_body), 200

    except Exception as e:
        print(f"get events error: {e}")
        return "ERROR", 500


@api.route("/evento/<int:theid>", methods=["GET"])
def get_evento(theid):
    try:
        response_body = [
            {
                "id": evento.id,
                "titulo": evento.name,
                "categoria_id": evento.categoria_id,
                "locacion_id": evento.locacion_id,
                "descripcion": evento.descripcion,
                "sinopsis": evento.sinopsis,
                "precio": evento.precio,
                "imagen": evento.imagen,
                "duracion": evento.duracion,
                "is_active": evento.is_active,
            }
            for evento in Evento.query.filter_by(id=theid)
        ]
        return jsonify(response_body), 200

    except Exception as e:
        print(f"get events error: {e}")
        return "ERROR", 500


@api.route("/evento_name/<name>", methods=["GET"])
def get_evento_name(name):
    try:
        response_body = [
            {
                "id": evento.id,
                "titulo": evento.name,
                "categoria_id": evento.categoria_id,
                "locacion_id": evento.locacion_id,
                "descripcion": evento.descripcion,
                "sinopsis": evento.sinopsis,
                "precio": evento.precio,
                "imagen": evento.imagen,
                "duracion": evento.duracion,
                "is_active": evento.is_active,
            }
            for evento in Evento.query.filter_by(name=name)
        ]
        return jsonify(response_body), 200

    except Exception as e:
        print(f"get event name error: {e}")
        return "ERROR", 500


@api.route("/nueva_categoria", methods=["POST"])
def new_category():
    try:
        name = request.json.get("name", None)
        query = Categoria.query.filter_by(name=name)
        results = list(map(lambda x: x.serialize(), query))
        if results == []:
            categoria = Categoria(name)
            db.session.add(categoria)
            db.session.commit()

        return {"mensaje": "ok"}, 200

    except Exception as e:
        print(f"Error nueva categoria : {e}")
        return "ERROR", 500


@api.route("/nueva_locacion", methods=["POST"])
def new_location():
    try:
        name = request.json.get("name", None)
        query = Locacion.query.filter_by(name=name)
        results = list(map(lambda x: x.serialize(), query))
        if results == []:
            locacion = Locacion(name)
            db.session.add(locacion)
            db.session.commit()

        return {"mensaje": "ok"}, 200

    except Exception as e:
        print(f"Error nueva locacion : {e}")
        return "ERROR", 500


@api.route("/locacion/<name>", methods=["GET"])
def get_location(name):
    try:
        response_body = [
            {
                "_id": locacion.id,
                "name": locacion.name,
            }
            for locacion in Locacion.query.filter_by(name=name)
        ]
        return jsonify(response_body), 200

    except Exception as e:
        print(f"get locacion error: {e}")
        return "ERROR", 500


@api.route("/locacion_id/<int:theid>", methods=["GET"])
def get_location_id(theid):
    try:
        response_body = [
            {
                "_id": locacion.id,
                "name": locacion.name,
            }
            for locacion in Locacion.query.filter_by(id=theid)
        ]
        return jsonify(response_body), 200

    except Exception as e:
        print(f"get locacion error: {e}")
        return "ERROR", 500


@api.route("/categoria/<name>", methods=["GET"])
def get_categoria(name):
    try:
        response_body = [
            {
                "_id": categoria.id,
                "name": categoria.name,
            }
            for categoria in Categoria.query.filter_by(name=name)
        ]
        return jsonify(response_body), 200

    except Exception as e:
        print(f"get category error: {e}")
        return "ERROR", 500


@api.route("/nueva_funcion", methods=["POST"])
def new_function():
    try:
        evento_id = request.json.get("evento_id", None)
        fecha = request.json.get("fecha", None)
        hora = request.json.get("hora", None)

        funcion = Funcion(
            evento_id, datetime.strptime(
                fecha, "%a, %d %b %Y %H:%M:%S %Z"), hora
        )
        db.session.add(funcion)
        db.session.commit()

        return {"id": funcion.id}, 200

    except Exception as e:
        print(f"Error nueva funcion : {e}")
        return "ERROR", 500


@api.route("/funciones/<int:evento_id>", methods=["GET"])
def get_functions(evento_id):
    try:
        response_body = [
            {
                "id": funcion.id,
                "evento_id": funcion.evento_id,
                "fecha": funcion.fecha,
                "hora": funcion.hora,
            }
            for funcion in Funcion.query.filter_by(evento_id=evento_id)
        ]
        return jsonify(response_body), 200

    except Exception as e:
        print(f"get functions error: {e}")
        return "ERROR", 500


@api.route("/horas/<int:evento_id>/<fecha>", methods=["GET"])
def get_function_hour(evento_id, fecha):
    try:

        response_body = [
            {
                "hora": funcion.hora,
            }
            for funcion in Funcion.query.filter_by(evento_id=evento_id, fecha=fecha)
        ]
        return jsonify(response_body), 200

    except Exception as e:
        print(f"get function hour error: {e}")
        return "ERROR", 500


@api.route("/hitorial", methods=["GET"])
def handle_historial():
    return {"mess": "mensaje"}


@api.route("/tickets", methods=["POST"])
def insert_tickets():
    try:
        evento_id = request.json.get("evento_id")
        funcion_id = request.json.get("funcion_id")
        fecha = datetime.strptime(request.json.get(
            "fecha"), "%a, %d %b %Y %H:%M:%S %Z")
        hora = request.json.get("hora")

        for element in itertools.product(
            ["A", "B", "C", "D", "E"], [str(x) for x in range(1, 7)]
        ):
            ubicacion = element[0] + element[1]
            ticket = Ticket(funcion_id=funcion_id, ubicacion=ubicacion)
            db.session.add(ticket)
        db.session.commit()
        return {"mensaje": "ok"}, 200
    except Exception as e:
        print(f"Error insert ticket: {e}")
        return "ERROR", 500


@api.route("/tickets/<int:funcion_id>", methods=["GET"])
def get_tickets(funcion_id):
    try:
        response_body = [
            {
                "id": ticket.id,
                "ubicacion": ticket.ubicacion,
                "sold": ticket.sold,
            }
            for ticket in Ticket.query.filter_by(funcion_id=funcion_id)
        ]
        return jsonify(response_body), 200
    except Exception as e:
        print(f"Error insert ticket: {e}")
        return "ERROR", 500


@api.route("/ticket/<int:ticket_id>", methods=["GET"])
def get_ticket(ticket_id):
    try:
        response_body = [
            {
                "funcion_id": ticket.funcion_id,
                "ubicacion": ticket.ubicacion,
                "sold": ticket.sold,
            }
            for ticket in Ticket.query.filter_by(id=ticket_id)
        ]
        return jsonify(response_body), 200
    except Exception as e:
        print(f"Error insert ticket: {e}")
        return "ERROR", 500


@api.route("/compras", methods=["GET"])
def get_compras():
    try:
        response_body = [
            {"id": compra.id, "ticket_id": compra.ticket_id, "user_id": compra.user_id}
            for compra in Compra.query.all()
        ]
        return jsonify(response_body), 200
    except Exception as e:
        print(f"Error insert ticket: {e}")
        return "ERROR", 500


@api.route("/procesarpago", methods=["POST"])
def procesar_pago():
    try:
        fecha = request.json.get("fecha")
        ubicaciones = request.json.get("ubicaciones")
        evento_id = request.json.get("evento_id")
        payment_data = {
            "transaction_amount": float(request.json.get("transaction_amount")),
            "token": request.json.get("token"),
            "description": request.json.get("description"),
            "installments": int(request.json.get("installments")),
            "payment_method_id": request.json.get("payment_method_id"),
            "payer": {
                "email": request.json.get("payer").get("email"),
                "identification": {
                    "type": request.json.get("payer").get("identification").get("type"),
                    "number": request.json.get("payer")
                    .get("identification")
                    .get("number"),
                },
                "first_name": request.json.get("payer").get("name"),
            },
        }

        payment_response = sdk.payment().create(payment_data)
        payment = payment_response["response"]
        if payment["status"] == "approved":
            funcion = Funcion.query.filter_by(
                evento_id=evento_id, fecha=fecha).first()
            for ubicacion in ubicaciones:
                ubicacion_name = ubicacion["row"] + str(ubicacion["number"])
                ticket = Ticket.query.filter_by(
                    funcion_id=funcion.id, ubicacion=ubicacion_name
                ).first()
                ticket.sold = True
                compra = Compra(ticket_id=ticket.id, user_id=1)
                db.session.add(compra)
                db.session.commit()

        return jsonify(payment), 200
    except Exception as e:
        print(f"Error pago: {e}")
        return "ERROR", 500


@api.route('/historialCompra', methods=['GET'])
@jwt_required()
def get_user_orden():
    try:
        user_id = get_jwt_identity()
        print(user_id, "JWT USERid")
        join_query = db.session.query(Compra, Ticket, User, Funcion, Evento, Locacion, Categoria)\
            .join(Ticket, Ticket.id == Compra.ticket_id)\
            .join(Funcion, Funcion.id == Ticket.funcion_id)\
            .join(Evento, Evento.id == Funcion.evento_id)\
            .join(Categoria, Categoria.id == Evento.categoria_id)\
            .join(Locacion, Locacion.id == Evento.locacion_id)\
            .join(User, Compra.user_id == User.id)\
            .filter_by(id=user_id)

        response_body = []

        print (tuple(join_query))
        for elemento in tuple(join_query):
            ticket_id = elemento['Compra'].ticket_id
            name = f'{elemento["User"].name} {elemento["User"].lastname}'
            name_event = elemento['Evento'].name
            precio = elemento['Evento'].precio
            hora = elemento['Funcion'].hora
            duracion = elemento['Evento'].duracion
            fecha = elemento['Funcion'].fecha
            locacion = elemento['Locacion'].name
            categoria = elemento['Categoria'].name
            ubicacion = elemento['Ticket'].ubicacion


            objeto = ({
                "ticket_id": ticket_id,
                "name": name,
                "name_event": name_event,
                "precio": precio,
                "hora": hora,
                "duracion": duracion,
                "fecha": fecha,
                "locacion":locacion,
                "categoria": categoria,
                "ubicacion": ubicacion

            })
            response_body.append(objeto)
        if not response_body:
                return jsonify({
            'mensaje': 'No hay compras'
        }), 204
        return jsonify(response_body), 200
    except Exception as e:
        print(f'ERROR/historialCompra {e}')
        return (f'ERROR/historialCompra {e}')
