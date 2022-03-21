"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)



@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():
    try:
       
        email = get_jwt_identity()
        response_body = {
        "message": email
    }
        return jsonify(response_body), 200
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
        user = User(name=name, lastname=lastname, email=email, password=password, is_active=True)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('handle_hello',name = user))
        return {
            'mensaje':'ok'
        }, 200
        
    except Exception as e:
        print(f'new_user_ERROR: {e}')
        return 'ERROR', 500

@api.route('/perfil/<name>')
def success(name):
   return 'welcome %s' % name

@api.route('/login',methods = ['POST', 'GET'])
def login():
    try:
        if request.method == 'POST':
            user = request.form['nm']
            return redirect(url_for('perfil',name = user))
        else:
            user = request.args.get('nm')
        return redirect(url_for('success',name = user))
    except Exception as e:
        print(f'login: {e}')
        return 'ERROR', 500

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        user = User.query.filter_by(email=email, password=password).first()
        if user is None:
            return jsonify({"msg": "Bad username or password"}), 401
           

        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    except Exception as e:
        print(f'ERROR CREATE_TOKEN: {e}')
        return 'ERROR', 500