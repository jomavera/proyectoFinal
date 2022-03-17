import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { datos, rows } from "../../../datosPrueba.js";
import "../../styles/seatpicker.scss";
import { SeatPicker } from "../component/SeatPicker";

export const EventoUbicaciones = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const datosEvento = datos.filter((e) => {
    return e.id === parseInt(params.theid);
  })[0];

  return (
    <div className="container-fluid">
      <div className="row row-cols-8 align-items-center">
        <div className="col"></div>
        <div className="col">
          <img
            src="https://via.placeholder.com/100x100"
            className="card-img-top p-5 align-items-center"
            alt="..."
          ></img>
        </div>
        <div className="col">
          <div className="row">
            <div className="fs-4 fw-bold">Teatro:</div>
            <div className="fs-4">{datosEvento.locacion}</div>
          </div>
          <div className="row">
            <div className="fs-4 fw-bold">Obra:</div>
            <div className="fs-4">{datosEvento.titulo}</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Fecha:</div>
            <div className="fs-5">13 de agosto 2022</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Duración:</div>
            <div className="fs-5">{datosEvento.duracion}</div>
          </div>
        </div>
        <div className="col">
          <SeatPicker
            rows={rows}
            maxReservableSeats={3}
            alpha
            visible
            selectedByDefault
            loading={false}
            continuous
          />
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

EventoUbicaciones.propTypes = {
  match: PropTypes.object,
};
