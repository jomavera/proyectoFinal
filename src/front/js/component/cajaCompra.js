import React from "react";
import { Link, useParams } from "react-router-dom";
import { buttonStyle2 } from "../../styles/navbar.js";
import { cajaStyle } from "../../styles/cajaCompra.js";
export const CajaCompra = (props) => {
  const params = useParams();
  const fechas = ["03-05-2022", "13-06-2022", "12-03-2022"];
  const horas = ["18h30", "22h00"];
  const fechasOptions = fechas.map((e, ix) => {
    return (
      <option value={e} key={ix}>
        {e}
      </option>
    );
  });
  const horasOptions = horas.map((e, ix) => {
    return (
      <option value={e} key={ix}>
        {e}
      </option>
    );
  });
  return (
    <form style={cajaStyle} className="rounded">
      <div className="mb-3">
        <label className="form-check-label">Seleccionar fecha</label>
        <select className="form-select" aria-label="seleccion fecha">
          {fechasOptions}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-check-label">Seleccionar hora</label>
        <select className="form-select" aria-label="seleccion hora">
          {horasOptions}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Ingresar número de tickets</label>
        <input type="number" className="form-control" />
      </div>
      <div className="btn btn-primary" style={buttonStyle2}>
        <Link
          to={`/eventoUbicaciones/${params.theid}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          Comprar
        </Link>
      </div>
    </form>
  );
};
