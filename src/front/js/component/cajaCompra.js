import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { buttonStyle2 } from "../../styles/navbar.js";
import { cajaStyle } from "../../styles/cajaCompra.js";

let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const CajaCompra = (props) => {
  const [NumSelec, SetNumero] = useState(0);
  const [fechaSelec, setFechaSelec] = useState(null);
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
      const fechaDate = new Date(e.fecha);
      return {
        label: fechaDate.toLocaleDateString("es-CL", options),
        value: e.fecha,
      };

      // return e.fecha.slice(0,-12);
    });

    setFechas(respFechas);
  }

  async function obtenerDatosHorasFuncion(evento_id, fecha) {
    const response = await fetch(
      `https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us38.gitpod.io/api/horas/${evento_id}/${fecha}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();

    let respHoras = data.map((e) => {
      return e.hora;
    });
    setHoras(respHoras);
  }

  useEffect(() => {
    if (props.datos.id) {
      obtenerDatosFunciones(props.datos.id);
    }
  }, [props.datos]);

  useEffect(() => {
    if (fechaSelec !== null) {
      obtenerDatosHorasFuncion(props.datos.id, fechaSelec);
    }
  }, [fechaSelec]);

  const onSelectFecha = (e) => {
    setFechaSelec(e.target.value);
  };

  const fechasOptions = fechas.map((e, ix) => {
    return (
      <option value={e.value} key={ix}>
        {e.label}
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
    const error =
      e.target.elements.numero.value && e.target.elements.hora.value
        ? false
        : true;
    if (!error) {
      props.onSubmit(e);
      history.push(`/eventoUbicaciones/${params.theid}`);
    } else {
      alert("Seleccionar el numero de tickets u hora!");
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
          onChange={(e) => onSelectFecha(e)}
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
