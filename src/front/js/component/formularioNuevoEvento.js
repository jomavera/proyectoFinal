import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { buttonStyle2 } from "../../styles/navbar.js";

export const FormularioNuevoEvento = () => {
  const [fechas, setFechas] = useState(new Date());

  async function ingresarEventoBase(datos) {
    const response = await fetch(
      "https://3001-jomavera-proyectofinal-kaws94oob0w.ws-us39a.gitpod.io/api/ingresar_evento",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: datos.nombre,
          categoria_id: datos.categoria_id,
          locacion: datos.locacion,
          descripcion: datos.descripcion,
          sinopsis: datos.sinopsis,
          precio: datos.precio,
          duracion: datos.duracion,
          imagen: datos.imagen,
          fechas: datos.fechas,
          horas: datos.horas,
        }),
      }
    );
    let respuesta = await response.json();
    console.log(respuesta);
    return respuesta;
  }
  async function manejarSubmit(e) {
    e.preventDefault();
    const fechas_utc = Array.isArray(fechas)
      ? fechas.map((fecha) => {
        return new Date(fecha).toUTCString();
      })
      : [fechas.toUTCString()];
    const horas_utc = Array.isArray(fechas)
      ? fechas.map((fecha) => {
        let fecha_date = new Date(fecha);
        let minutos = fecha_date.getMinutes();
        if (minutos < 10) {
          minutos = `0${minutos}`;
        }
        return `${fecha_date.getHours()}h${minutos}`;
      })
      : [fechas].map((fecha) => {
        let fecha_date = new Date(fecha);
        let minutos = fecha_date.getMinutes();
        if (minutos < 10) {
          minutos = `0${minutos}`;
        }
        return `${fecha_date.getHours()}h${minutos}`;
      });
    const response = await ingresarEventoBase({
      nombre: e.target.elements.nombre.value,
      categoria_id: e.target.elements.categoria_id.value,
      locacion: e.target.elements.locacion.value,
      descripcion: e.target.elements.descripcion.value,
      sinopsis: e.target.elements.sinopsis.value,
      precio: e.target.elements.precio.value,
      duracion: e.target.elements.duracion.value,
      imagen: e.target.elements.imagen.value,
      fechas: fechas_utc,
      horas: horas_utc,
    });

    alert("Evento ingresado exitosamente");
  }
  return (
    <div className="container">
      <div className="row justify-content-center m-2">
        <div className="col-4">
          <div style={{ fontFamily: "Montserrat", fontSize: "25px" }}>
            Ingresar nuevo evento
          </div>
        </div>
      </div>
      <div className="row justify-content-center m-2">
        <div className="col-4">
          <form onSubmit={(e) => manejarSubmit(e)}>
            <div className="form-check-label">Ingresar nombre de evento</div>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del evento"
              name="nombre"
            ></input>
            <div className="form-check-label">Ingresar categoria</div>
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue={1}
              name="categoria_id"
            >
              <option value="1">Teatro</option>
              <option value="2">Cine</option>
              <option value="3">Concierto</option>
            </select>
            <div className="form-check-label">Ingresar locacion</div>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de la locacion"
              name="locacion"
            ></input>
            <div className="form-check-label">Seleccionar funciones</div>
            <DatePicker
              format="DD/MM/YYYY HH:mm:ss"
              multiple
              value={fechas}
              onChange={setFechas}
              plugins={[<TimePicker position="bottom" />]}
            />
            <div className="form-check-label">Ingresar descripcion</div>
            <textarea
              className="form-control"
              id="floatingTextarea1"
              name="descripcion"
            ></textarea>
            <div className="form-check-label">Ingresar sinopsis</div>
            <textarea
              className="form-control"
              id="floatingTextarea2"
              name="sinopsis"
            ></textarea>
            <div className="form-check-label">Ingresar precio</div>
            <input
              type="number"
              min={1000}
              className="form-control"
              name="precio"
            ></input>
            <div className="form-check-label">Duracion</div>
            <input
              type="number"
              min={1}
              className="form-control"
              placeholder="Duracion evento en horas"
              name="duracion"
            ></input>
            <div className="form-check-label">Ingresar URL de imagen</div>
            <input type="text" className="form-control" name="imagen"></input>
            <button
              type="submit"
              className="btn btn-primary m-1"
              style={buttonStyle2}
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
