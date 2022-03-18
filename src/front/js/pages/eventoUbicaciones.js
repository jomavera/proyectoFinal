import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { datos, rows } from "../../../datosPrueba.js";
import "../../styles/seatpicker.scss";
import { SeatPicker } from "../component/SeatPicker";
import { buttonStyle2 } from "../../styles/navbar";

export const EventoUbicaciones = (props) => {
  const [numSelecc, SetNumSelecc] = useState(0);
  const { store, actions } = useContext(Context);
  const params = useParams();
  const datosEvento = datos.filter((e) => {
    return e.id === parseInt(params.theid);
  })[0];

  const anadirUbicacion = ({ row, number, id }, addCb) => {
    addCb(row, number, id);
    console.log(store.numero);
    if (numSelecc < store.numero) {
      actions.anadirUbicacion(row, number, id);
      SetNumSelecc(numSelecc + 1);
    }
    console.log(store);
  };

  const quitarUbicacion = ({ row, number, id }, removeCb) => {
    SetNumSelecc(numSelecc - 1);
    actions.quitarUbicacion(row, number, id);
    removeCb(row, number);
    console.log(store);
  };
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
        <div className="col-md-auto">
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
            <div className="fs-5">{store.fecha}</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Hora:</div>
            <div className="fs-5">{store.hora}</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Duración:</div>
            <div className="fs-5">{datosEvento.duracion}</div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <SeatPicker
              rows={rows}
              maxReservableSeats={store.numero}
              alpha
              visible
              selectedByDefault
              loading={false}
              continuous
              addSeatCallback={anadirUbicacion}
              removeSeatCallback={quitarUbicacion}
            />
          </div>
          <div className="row">
            <div className="fs-5">
              {numSelecc} de {store.numero} seleccinados
            </div>
          </div>
        </div>
        <div className="col align-items-end">
          <div className="btn btn-primary" style={buttonStyle2}>
            <Link
              to={`/datosCompra`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Continuar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

EventoUbicaciones.propTypes = {
  match: PropTypes.object,
};
