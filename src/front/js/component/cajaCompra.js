import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { buttonStyle2 } from "../../styles/navbar.js";
import { cajaStyle } from "../../styles/cajaCompra.js";

export const CajaCompra = (props) => {
  const [NumSelec, SetNumero] = useState(0);
  const [fechas, setFechas] = useState([]);
  const [horas, setHoras] = useState([]);
  const params = useParams();
  const history = useHistory();

  async function obtenerDatosFunciones(evento_id) {
    const response = await fetch(
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us38.gitpod.io/api/funciones/${evento_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    let respFechas = data.map((e) => {
      return e.fecha;
    });
    let respHoras = data.map((e) => {
      return e.hora;
    });
    setFechas(respFechas);
    setHoras(respHoras);
  }
  useEffect(() => {
    obtenerDatosFunciones(props.datos.id);
  }, [props.datos]);
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
  const cambiarNumero = (e) => {
    SetNumero(e.target.value);
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
        <input
          type="number"
          className="form-control"
          min={1}
          name="numero"
          onChange={(e) => cambiarNumero(e)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio</label>${props.datos.precio}
      </div>
      <hr></hr>
      <div className="mb-3">
        <label className="form-label">Total compra</label>$
        {props.datos.precio * NumSelec}
      </div>
      <button type="submit" className="btn btn-primary" style={buttonStyle2}>
        Comprar
      </button>
    </form>
  );
};
