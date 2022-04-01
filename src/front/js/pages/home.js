import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Box } from "../component/box.js";
import { Cards } from "../component/cards.js";
// import { datos } from "../../../datosPrueba.js";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [datos, setDatos] = useState([]);

  async function obtenerDatosEventos() {
    const response = await fetch(
      `https://3001-jomavera-proyectofinal-kaws94oob0w.ws-us38.gitpod.io/api/eventos`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    setDatos(data);
  }
  useEffect(() => {
    obtenerDatosEventos();
  }, []);

  return (
    <div className="container-fluid" style={{ backgroundColor: "#e9ecef" }}>
      <div className="row pt-5">
        <div className="col-2"></div>
        <div className="col-5">
          <h1 style={{ fontFamily: "Montserrat" }}>Que quieres hacer hoy?</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col"></div>
        <div className="col text-center">
          <Box texto="Disfrutar un obra de teatro" enlace="/" />
        </div>
        <div className="col text-center ">
          <Box texto="Ver una película junto amigos" enlace="/" />
        </div>
        <div className="col text-center">
          <Box
            texto="Ir a un concierto de un artista que me gusta"
            enlace="/"
          />
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="container">
          <hr></hr>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-2"></div>
        <div className="col-4">
          <h1 style={{ fontFamily: "Montserrat" }}>Oferta eventos</h1>
        </div>
        <div className="col-5"></div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-8">
          <Cards cartas={datos} />
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
