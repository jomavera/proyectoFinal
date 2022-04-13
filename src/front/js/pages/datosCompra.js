import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { cajaStyle } from "../../styles/cajaCompra.js";
import { buttonStyle2 } from "../../styles/navbar";

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const DatosCompra = (props) => {
  const { store, actions } = useContext(Context);
  const [datosEvento, setdatosEvento] = useState({});
  const history = useHistory();

  if (store.token === null) {
    history.push("/login");
    return <div>Iniciar sesion</div>;
  }

  async function obtenerDatosEventoLocacion() {
    const response = await fetch(
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us39a.gitpod.io/api/datos_locacion?evento_id=${store.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    setdatosEvento(data);
  }
  useEffect(() => {
    obtenerDatosEventoLocacion();
  }, []);

  const ubicaciones = store.ubicaciones
    .map((e) => {
      return e.row + e.number.toString();
    })
    .reduce((acc, curr) => {
      acc = acc === "" ? acc + curr : acc + ", " + curr;
      return acc;
    }, "");
  const totalCompra = store.precio * store.numero;

  return (
    <div className="container-fluid">
      <div className="row row-cols-8 align-items-center">
        <div className="col"></div>
        <div className="col-md-auto" style={cajaStyle}>
          <div className="row">
            <div className="fs-4 fw-bold">Locación:</div>
            <div className="fs-4">{datosEvento.locacion}</div>
          </div>
          <div className="row">
            <div className="fs-4 fw-bold">Evento:</div>
            <div className="fs-4">{datosEvento.titulo}</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Fecha:</div>
            <div className="fs-5">
              {store.fecha.toLocaleDateString("es-CL", options)}
            </div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Hora:</div>
            <div className="fs-5">{store.hora}</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Número de entradas:</div>
            <div className="fs-5">{store.numero} unidades</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Ubicaciones:</div>
            <div className="fs-5">{ubicaciones}</div>
          </div>
          <div className="row">
            <div className="fs-3 fw-bold text-center">Total a cobrar:</div>
            <div className="fs-4 text-center">
              ${store.precio * parseInt(store.numero)}
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
      <div className="row justify-content-center">
        <div className="col-1">
          <div className="btn btn-primary m-2" style={buttonStyle2}>
            <Link
              to={`/pago`}
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

DatosCompra.propTypes = {
  match: PropTypes.object,
};
