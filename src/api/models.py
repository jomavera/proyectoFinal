from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self, name, lastname, email, password, is_active):
        self.name = name
        self.lastname = lastname
        self.email = email
        self.password = password
        self.is_active = is_active

    # def __repr__(self):
    #     return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Evento(db.Model):
    __tablename__ = "eventos"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    categoria_id = db.Column(
        db.Integer, db.ForeignKey("categorias.id"), unique=False, nullable=False
    )
    locacion_id = db.Column(
        db.Integer, db.ForeignKey("locaciones.id"), unique=False, nullable=False
    )
    descripcion = db.Column(db.String(120), unique=False, nullable=False)
    sinopsis = db.Column(db.String(), unique=False, nullable=False)
    precio = db.Column(db.Integer(), unique=False, nullable=False)
    duracion = db.Column(db.String(10), unique=False, nullable=False)
    imagen = db.Column(db.String(120), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    comuna_id = db.Column(
        db.Integer, db.ForeignKey("comunas.id"), unique=False, nullable=True
    )

    def __init__(
        self,
        name,
        categoria_id,
        locacion_id,
        descripcion,
        sinopsis,
        precio,
        duracion,
        imagen,
        comuna_id
    ):
        self.name = name
        self.categoria_id = categoria_id
        self.locacion_id = locacion_id
        self.descripcion = descripcion
        self.sinopsis = sinopsis
        self.precio = precio
        self.duracion = duracion
        self.imagen = imagen
        self.is_active = True
        self.comuna_id = comuna_id

    def serialize(self):
        return {
            "id": self.id,
            "categoria_id": self.categoria_id,
            "locacion_id": self.locacion_id,
            "descripcion": self.descripcion,
            "sinopsis": self.sinopsis,
            "precio": self.precio,
            "duracion": self.duracion,
            "imagen": self.imagen,
            "activo": self.is_active,
            "comuna_id": self.comuna_id
        }


class Ticket(db.Model):
    __tablename__ = "tickets"
    id = db.Column(db.Integer, primary_key=True)
    funcion_id = db.Column(
        db.Integer, db.ForeignKey("funciones.id"), unique=False, nullable=False
    )
    ubicacion = db.Column(db.String(2), unique=False, nullable=False)
    sold = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self, funcion_id, ubicacion):
        self.funcion_id = funcion_id
        self.ubicacion = ubicacion
        self.sold = False

    def serialize(self):
        return {
            "id": self.id,
            "funcion_id": self.funcion_id,
            "ubicacion": self.ubicacion,
            "sold": self.sold,
        }


class Funcion(db.Model):
    __tablename__ = "funciones"
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(
        db.Integer, db.ForeignKey("eventos.id"), unique=False, nullable=False
    )
    fecha = db.Column(db.Date(), unique=False, nullable=False)
    hora = db.Column(db.String(20), unique=False, nullable=False)

    def __init__(self, evento_id, fecha, hora):
        self.evento_id = evento_id
        self.fecha = fecha
        self.hora = hora

    def serialize(self):
        return {
            "id": self.id,
            "evento_id": self.evento_id,
            "fecha": self.fecha,
            "hora": self.hora,
        }


class Compra(db.Model):
    __tablename__ = "compras"
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(
        db.Integer, db.ForeignKey("tickets.id"), unique=False, nullable=False
    )
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), unique=False, nullable=False
    )

    def __init__(self, ticket_id, user_id):
        self.ticket_id = ticket_id
        self.user_id = user_id

    def serialize(self):
        return {
            "id": self.id,
            "ticket_id": self.ticket_id,
            "orden_id": self.orden_id,
        }


class Categoria(db.Model):
    __tablename__ = "categorias"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Locacion(db.Model):
    __tablename__ = "locaciones"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Comuna(db.Model):
    __tablename__ = "comunas"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
