import React from "react";
import { Link } from "react-router-dom";

export const Box = (props) => {
  const divStyle = {
    height: "230px",
    border: "none",
    borderRadius: "30px",
    backgroundColor: "#f8f9fa",
    padding: "30px",
    margin: "20px",
    fontFamily: "Montserrat",
  };
  return (
    <h2 style={divStyle}>
      <Link to={props.enlace} style={{ textDecoration: "none" }}>
        <div style={{ color: "black" }}>{props.texto}</div>
      </Link>
    </h2>
  );
};