import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { datos, rows } from "../../../datosPrueba.js";
import { cajaStyle } from "../../styles/cajaCompra.js";

export const DatosCompra = (props) => {
  const { store, actions } = useContext(Context);
  const datosEvento = datos.filter((e) => {
    return e.id === parseInt(store.id);
  })[0];

  const ubicaciones = store.ubicaciones
    .map((e) => {
      return e.row + e.number.toString();
    })
    .reduce((acc, curr) => {
      acc = acc === "" ? acc + curr : acc + ", " + curr;
      return acc;
    }, "");
  const totalCompra = store.precio * store.numero;
  console.log(totalCompra);
  console.log();
  return (
    <div className="container-fluid">
      <div className="row row-cols-8 align-items-center">
        <div className="col"></div>
        <div className="col-md-auto" style={cajaStyle}>
          <div className="row">
            <div className="fs-4 fw-bold">Teatro:</div>
            <div className="fs-4">{datosEvento.locacion}</div>
          </div>
          <div className="row">
            <div className="fs-4 fw-bold">Evento:</div>
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
            <div className="fs-5 fw-bold">Número de entradas:</div>
            <div className="fs-5">{store.numero} unidades</div>
          </div>
          <div className="row">
            <div className="fs-5 fw-bold">Locaciones:</div>
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
    </div>
  );
};

DatosCompra.propTypes = {
  match: PropTypes.object,
};
