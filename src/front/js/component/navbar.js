import React from "react";
import { Link } from "react-router-dom";
import {
  logoStyle,
  linksStyle,
  dropDownsStyle,
  buttonStyle1,
  buttonStyle2,
} from "../../styles/navbar.js";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div style={logoStyle}>ticketGo</div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div style={linksStyle}>Inicio</div>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={dropDownsStyle}
              >
                Categorias
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "#5BB2F5" }}
                    >
                      Teatro
                    </Link>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "#5BB2F5" }}
                    >
                      Cine
                    </Link>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <Link to="/">
            <button className="btn mx-1" style={buttonStyle1}>
              Iniciar Sesión
            </button>
          </Link>
          <Link to="/">
            <button className="btn" style={buttonStyle2}>
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
