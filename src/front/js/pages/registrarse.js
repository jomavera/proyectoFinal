
   
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


  const handleClick = (e) => {
    
    if (name != "" && lastname != "" && email != "" && password != "" && name != undefined && lastname != undefined && password != undefined) {
      if(password.length>4){
        
        actions.registrarse(name, lastname, email, password).then((data) => {
          console.log(data,"data")
         
          
          if (data && data.mensaje && data.mensaje.toLowerCase() === "ok") {
  
            actions.actualizarEstado("Registrado");
          }
  
          if(data.Error != undefined){
            alert(data.Error)
          }
  
        });
      e.preventDefault()
      }else{
        alert("Contraseña debe tener mas de 4 caracteres")
      }
      
    };

  }



  console.log(name, "nombre")
  console.log(lastname, "Apellido")
  console.log(email, "email")


  if (store.estado != "") {
    setTimeout('history.back()', 3000);
    return (
      <>
        <div className="row justify-content-center registro">
          <div className="col col-lg-6">
            <div className="login-form-1">Usuario registrado correctamente, inicia sesión para ver tu perfil</div>
          </div>
        </div>

      </>
    );

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
                    minLength={2} pattern="[A-Za-z]*" />
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
                    minLength={3}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputEmail" className="control-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Correo electónico"  required value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="help-block with-errors"></div>
              </div>

              <label htmlFor="inputPassword" className="control-label">Crear Contraseña</label>
              <input
                id="passwd"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="btnRegistrarse">
              <button onClick={(e)=>handleClick(e)} className="btn btn-primary btn-block">
                Registrarse
              </button>
              </div>
            </form>
          </div>
        </div>




      </div >
    </>
  );
};
