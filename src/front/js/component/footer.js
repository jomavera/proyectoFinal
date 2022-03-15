import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoStyle, linksStyle } from "../../styles/navbar";

export const Footer = () => (
  <div className="container-fluid" style={{ backgroundColor: "#f8f9fa" }}>
    <footer className="row row-cols-6 py-3">
      <div className="col offset-md-2 pt-3">
        <div style={logoStyle}>ticketGo</div>
      </div>
      <div className="d-flex" style={{ width: "45px" }}>
        <div className="vr"></div>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={linksStyle}>Inicio</div>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={linksStyle}>Contacto</div>
          </Link>
        </li>
      </ul>
      <div
        className="col offset-3"
        style={{ color: "#5BB2F5", fontSize: "12px", paddingTop: "50px" }}
      >
        ©2022 ticketGo
      </div>
    </footer>
  </div>
);
