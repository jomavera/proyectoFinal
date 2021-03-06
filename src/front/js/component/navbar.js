import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import {
  logoStyle,
  linksStyle,
  dropDownsStyle,
  buttonStyle1,
  buttonStyle2,
} from "../../styles/navbar.js";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-bottom">
      <div className="container">
        <div style={logoStyle}>ticketGo</div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div style={linksStyle}>Inicio</div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          { !store.token ?
            <Link to="/login">
              <button className="btn mx-1" style={buttonStyle1}>
                Iniciar Sesión
              </button>
            </Link>
            :
            <Link to="/">
            <button onClick={()=> actions.logout()} className="btn mx-1" style={buttonStyle1}>Cerrar sesión</button>
            </Link>

            
          }
          {!store.token ?
          <Link to="/registrarse">
            <button className="btn" style={buttonStyle2}>
              Registrarse
            </button>
          </Link>
          :   <Link to="/perfil">
          <button  className="btn mx-1" style={buttonStyle1}>Mi Perfil</button>
          </Link> }
        </div>
      </div>
    </nav>
  );
};
