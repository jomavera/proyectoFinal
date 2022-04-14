import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
// import { datos, rows } from "../../../datosPrueba.js";
import "../../styles/seatpicker.scss";
import { SeatPicker } from "../component/SeatPicker";
import { buttonStyle2 } from "../../styles/navbar";

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const EventoUbicaciones = (props) => {
  const [numSelecc, SetNumSelecc] = useState(0);
  const [datosEvento, setDatos] = useState({});
  const [datosLocacion, setLoc] = useState({});
  const [rows, setDatosRows] = useState(null);
  const { store, actions } = useContext(Context);
  const params = useParams();
  const history = useHistory();

  if (store.token === null) {
    history.push("/login");
  }
  async function obtenerDatosEventoLocacion(theid) {
    const response = await fetch(`${process.env.BASE_URL}api/evento/${theid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let dataEvento = await response.json();
    setDatos(dataEvento[0]);
    const responseLoc = await fetch(
      `${process.env.BASE_URL}api/locacion_id/${dataEvento[0].locacion_id}`,
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

  async function obtenerEstadosTickets() {
    const response = await fetch(
      `${process.env.BASE_URL}api/tickets/${
        store.id
      }/${store.fecha.toUTCString()}/${store.hora}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setDatosRows(data);
  }

  useEffect(() => {
    obtenerDatosEventoLocacion(params.theid);
  }, []);

  useEffect(() => {
    obtenerEstadosTickets();
  }, []);

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
    <div className="container">
      <div className="row align-items-center">
        <div className="col-3 offset-1">
          <div className="row">
            <img
              src="https://via.placeholder.com/200x100"
              alt="..."
              className="img-fluid p-1"
            ></img>
          </div>
          <div className="row">
            <div className="fs-6 fw-bold">Locación:</div>
            <div className="fs-6">{datosLocacion.name}</div>
          </div>
          <div className="row">
            <div className="fs-6 fw-bold">Evento:</div>
            <div className="fs-6">{datosEvento.titulo}</div>
          </div>
          <div className="row">
            <div className="fs-7 fw-bold">Fecha:</div>
            <div className="fs-7">
              {store.fecha.toLocaleDateString("es-CL", options)}
            </div>
          </div>
          <div className="row">
            <div className="fs-7 fw-bold">Hora:</div>
            <div className="fs-7">{store.hora}</div>
          </div>
          <div className="row">
            <div className="fs-7 fw-bold">Duración:</div>
            <div className="fs-7">{datosEvento.duracion}</div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            {rows != null && (
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
            )}
          </div>
          <div className="row">
            <div className="fs-5">
              {numSelecc} de {store.numero} seleccionados
            </div>
          </div>
        </div>
        <div className="col align-items-end">
          {numSelecc === store.numero && (
            <div className="btn btn-primary" style={buttonStyle2}>
              <Link
                to={`/datosCompra`}
                style={{ textDecoration: "none", color: "white" }}
              >
                Continuar
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

EventoUbicaciones.propTypes = {
  match: PropTypes.object,
};
