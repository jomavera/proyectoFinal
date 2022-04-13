import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { CajaCompra } from "../component/cajaCompra";

export const Evento = (props) => {
  const { store, actions } = useContext(Context);
  const [datosEvento, setDatos] = useState({});
  const [datosLocacion, setLoc] = useState({});
  const params = useParams();

  async function obtenerDatosEventos(theid) {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/evento/${theid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let dataEvento = await response.json();
    setDatos(dataEvento[0]);
    const responseLoc = await fetch(
      `${process.env.BACKEND_URL}/api/locacion_id/${dataEvento[0].locacion_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let dataLoc = await responseLoc.json();
    setLoc(dataLoc[0]);
  }

  useEffect(() => {
    obtenerDatosEventos(params.theid);
  }, []);

  const actualizarStore = (e) => {
    const fechaDate = new Date(e.target.elements.fecha.value);
    actions.actualizarPedido(
      params.theid,
      fechaDate,
      e.target.elements.hora.value,
      parseInt(e.target.elements.numero.value),
      datosEvento.precio
    );
    console.log(store);
  };
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-4 offset-1">
          <img
            src={datosEvento.imagen}
            className="card-img-top p-1 align-items-center"
            alt="..."
          ></img>
        </div>
        <div className="col-4 py-4" style={{ fontFamily: "Montserrat" }}>
          <div className="row">
            <div className="fs-4 fw-bold">Teatro:</div>
            <div className="fs-4">{datosLocacion.name}</div>
          </div>
          <div className="row">
            <div className="fs-4 fw-bold">Obra:</div>
            <div className="fs-4">{datosEvento.titulo}</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Sinopsis</div>
          </div>
          <div className="row">
            <div className="fs-6">{datosEvento.sinopsis}</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Duración:</div>
            <div className="fs-5">{datosEvento.duracion}</div>
          </div>
        </div>
        <div className="col-3">
          <CajaCompra
            onSubmit={(e) => actualizarStore(e)}
            datos={datosEvento}
          />
        </div>
      </div>
    </div>
  );
};

Evento.propTypes = {
  match: PropTypes.object,
};
