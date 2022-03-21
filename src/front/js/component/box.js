import React from "react";
import { Link } from "react-router-dom";

export const Box = (props) => {
  const divStyle = {
    height: "auto",
    padding: "30px",
    border: "none",
    borderRadius: "30px",
    backgroundColor: "#f8f9fa",
    margin: "20px",
    fontFamily: "Montserrat",
    fontSize: "25px",
    color: "black",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  };
  return (
    <Link to={props.enlace} style={{ textDecoration: "none" }}>
      <div style={divStyle}>{props.texto}</div>
    </Link>
  );
};
