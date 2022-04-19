import React from "react";
import { Link } from "react-router-dom";
import { buttonStyle2 } from "../../styles/navbar.js";
export const Card = (props) => {

  return (
    <div className="col">
      <div className="card m-3">
        <img src={props.imagen} style={{height: "300px", width:"100%", objectFit: "cover"}}className="card-img-top p-1" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">{props.titulo}</h5>
          <p className="card-text">{props.descripcion}</p>
          <div className="btn btn-primary" style={buttonStyle2}>
            <Link
              to={`/evento/${props.idEvento}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Ver mas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
