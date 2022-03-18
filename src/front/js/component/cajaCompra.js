import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { buttonStyle2 } from "../../styles/navbar.js";
import { cajaStyle } from "../../styles/cajaCompra.js";
export const CajaCompra = (props) => {
  const params = useParams();
  const history = useHistory();
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

  const manejarSubmit = (e) => {
    const error = e.target.elements.numero.value ? false : true;
    if (!error) {
      props.onSubmit(e);
      history.push(`/eventoUbicaciones/${params.theid}`);
    } else {
      alert("Seleccionar el numero de tickets!");
    }
  };
  return (
    <form
      style={cajaStyle}
      className="rounded"
      onSubmit={(e) => manejarSubmit(e)}
    >
      <div className="mb-3">
        <label className="form-check-label">Seleccionar fecha</label>
        <select
          className="form-select"
          aria-label="seleccion fecha"
          name="fecha"
        >
          {fechasOptions}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-check-label">Seleccionar hora</label>
        <select className="form-select" aria-label="seleccion hora" name="hora">
          {horasOptions}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Ingresar número de tickets</label>
        <input type="number" className="form-control" min={1} name="numero" />
      </div>
      <button type="submit" className="btn btn-primary" style={buttonStyle2}>
        Comprar
      </button>
    </form>
  );
};
