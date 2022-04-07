import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { buttonStyle2 } from "../../styles/navbar";
import { cajaStyle } from "../../styles/cajaCompra.js";

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const PagoExitoso = (props) => {
  const { store, actions } = useContext(Context);
  const [datosEvento, setdatosEvento] = useState({});

  async function obtenerDatosEventoLocacion() {
    const response = await fetch(
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us38.gitpod.io/api/datos_locacion?evento_id=${store.id}`,
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
  async function manejarSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us38.gitpod.io/api/enviar_correo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_evento: datosEvento.titulo,
          ubicaciones: store.ubicaciones,
          locacion: datosEvento.locacion,
          fecha: store.fecha.toLocaleDateString("es-CL", options),
          hora: store.hora,
          total: store.precio * parseInt(store.numero),
          correo: e.target.elements.correo.value,
        }),
      }
    );
    let data = await response.json();
    console.log(data);
  }
  return (
    <div className="container-fluid">
      <div className="row text-center p-3">
        <div className="col">
          <div style={{ fontFamily: "Montserrat", fontSize: "24px" }}>
            Pago realizado con exito
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-3"></div>
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
            <div className="fs-3 fw-bold text-center">Total pagado:</div>
            <div className="fs-4 text-center">
              ${store.precio * parseInt(store.numero)}
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center p-3">
        <div className="col-5">
          <form onSubmit={(e) => manejarSubmit(e)}>
            <div className="mb-3">
              <label for="formFile" className="form-label">
                Enviar confirmación por E-mail
              </label>
              <input
                className="form-control"
                type="email"
                placeholder="name@example.com"
                name="correo"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={buttonStyle2}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

PagoExitoso.propTypes = {
  match: PropTypes.object,
};
