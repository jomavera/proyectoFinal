import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { useHistory } from "react-router-dom";

import { Context } from "../store/appContext";

export const Registrarse = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [error, setError] = useState(false)


  const handleClick = () => {
    if (name && lastname && email && password)
      actions.registrarse(name, lastname, email, password).then((data) => {
        console.log(data)
        if (data && data.mensaje && data.mensaje.toLowerCase() === "ok") {

          actions.actualizarEstado("Registrado");
        }

      });
  };


  function redireccionar(){
    window.location.href = "http://elpadawan.com";
  }
  setTimeout("redireccionar()", 5000);

  console.log(name, "nombre")
  console.log(lastname, "Apellido")
  console.log(email,"email")
  if (store.estado != "") {
    return <div>Estas registrado</div>;
  }
  return (
    <>
      <div className="container-fluid login-container">
        <div className="row justify-content-center">
          <div className="col-md-auto login-form-1">
            <h3>Registrate a una cuenta gratis</h3>
            <form name="form2" action="#">
              <div className="row">

                <div className="form-group col-6">
                  <label htmlFor="inputNombre" className="control-label">Nombre</label>
                  <input type="text" 
                  className="form-control" 
                  id="inputNombre" 
                  placeholder="Nombre" 
                  required value={name} onChange={(e) => setName(e.target.value)} 
                  minlength={2} pattern="[A-Za-z]*" />
                  <div className="help-block with-errors"></div>
                </div>

                <div className="form-group col-6">
                  <label htmlFor="inputApellido" className="control-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    id="inputApellido"
                    required value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    minlength={3} pattern="[A-Za-z]*"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputEmail" className="control-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Correo electónico" data-error="Bruh, that email address is invalid" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="help-block with-errors"></div>
              </div>

              <label htmlFor="inputPassword" className="control-label">Crear Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" onClick={handleClick} className="btn btn-primary btn-block">
                Registrarse
              </button>
            </form>
          </div>
        </div>




      </div >
    </>
  );
};
