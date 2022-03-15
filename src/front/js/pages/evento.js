import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { datos } from "../../../datosPrueba.js";

export const Evento = (props) => {
  const { store, actions } = useContext(Context);

  const params = useParams();
  const datosEvento = datos.filter((e) => {
    return e.id === parseInt(params.theid);
  })[0];

  return (
    <div className="container-fluid">
      <div className="row row-cols-8 align-items-center">
        <div className="col"></div>
        <div className="col">git d
          <img
            src="https://via.placeholder.com/300x300"
            className="card-img-top p-1 align-items-center"
            alt="..."
          ></img>
        </div>
        <div className="col-4 py-4" style={{ fontFamily: "Montserrat" }}>
          <div className="row">
            <div className="fs-4 fw-bold">Teatro:</div>
            <div className="fs-4">{datosEvento.locacion}</div>
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
        <div className="col"></div>
        <div className="col"></div>
      </div>
    </div>
  );
};

Evento.propTypes = {
  match: PropTypes.object,
};
