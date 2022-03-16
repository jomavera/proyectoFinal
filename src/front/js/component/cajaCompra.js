import React from "react";
import { Link } from "react-router-dom";
import { buttonStyle2 } from "../../styles/navbar.js";
import { cajaStyle } from "../../styles/cajaCompra.js";
export const CajaCompra = (props) => {
  const fechas = ["03-05-2022", "13-06-2022", "12-03-2022"];
  const horas = ["18h30", "22h00"];
  const fechasOptions = fechas.map((e, ix) => {
    return <option value={e}>{e}</option>;
  });
  const horasOptions = horas.map((e, ix) => {
    return <option value={e}>{e}</option>;
  });
  return (
    <form style={cajaStyle} className="rounded">
      <div class="mb-3">
        <label className="form-check-label" for="exampleCheck1">
          Seleccionar fecha
        </label>
        <select class="form-select" aria-label="seleccion fecha">
          {fechasOptions}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-check-label" for="exampleCheck1">
          Seleccionar hora
        </label>
        <select class="form-select" aria-label="seleccion hora">
          {horasOptions}
        </select>
      </div>
      <div class="mb-3">
        <label classNAme="form-label">Ingresar número de tickets</label>
        <input type="number" className="form-control" />
      </div>
      <button type="submit" className="btn" style={buttonStyle2}>
        Comprar
      </button>
    </form>
  );
};
