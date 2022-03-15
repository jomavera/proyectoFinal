import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Box } from "../component/box.js";
import { Cards } from "../component/cards.js";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const datos = [
    {
      titulo: "Evento 1",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit. Nunc mauris ipsum, rhoncus in dolor nec, posuere dignissim nulla. Nam ac tincidunt.",
      enlace: "/",
    },
    {
      titulo: "Evento 2",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit. Nunc mauris ipsum, rhoncus in dolor nec, posuere dignissim nulla. Nam ac tincidunt.",
      enlace: "/",
    },
    {
      titulo: "Evento 3",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit. Nunc mauris ipsum, rhoncus in dolor nec, posuere dignissim nulla. Nam ac tincidunt.",
      enlace: "/",
    },
    {
      titulo: "Evento 4",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit. Nunc mauris ipsum, rhoncus in dolor nec, posuere dignissim nulla. Nam ac tincidunt.",
      enlace: "/",
    },
    {
      titulo: "Evento 5",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus consectetur blandit. Nunc mauris ipsum, rhoncus in dolor nec, posuere dignissim nulla. Nam ac tincidunt.",
      enlace: "/",
    },
  ];
  return (
    <div className="container-fluid" style={{ backgroundColor: "#e9ecef" }}>
      <div className="row pt-5">
        <div className="col-2"></div>
        <div className="col-4">
          <h1 style={{ fontFamily: "Montserrat" }}>Que quieres hacer hoy?</h1>
        </div>
        <div className="col-5"></div>
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
