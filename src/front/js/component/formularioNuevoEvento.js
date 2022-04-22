import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { buttonStyle2 } from "../../styles/navbar.js";

const initialValues = {
  nombre: "",
  descripcion: "",
  locacion: "",
  comuna: "",
  sinopsis: "",
  duracion: "",
  precio: "",
  imagen: "",
};

export const FormularioNuevoEvento = () => {
  const [fechas, setFechas] = useState(new Date());
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const history = useHistory();
  async function ingresarEventoBase(datos) {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/ingresar_evento`,
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
          comuna: datos.comuna,
        }),
      }
    );
    let respuesta = await response.json();
    console.log(respuesta);
    return respuesta;
  }
  async function manejarSubmit(e) {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0){
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
      comuna: e.target.elements.comuna.value,
    });

    alert("Evento ingresado exitosamente");
    history.push("/perfil");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    setFormErrors(validate(formValues));
  }, [formValues]);

  const validate = (values) => {
    const errors = {};
    if (!values.nombre) {
      errors.nombre = "Se requiere nombre del evento";
    }
    if (!values.locacion) {
      errors.locacion = "Se requiere locacion del evento";
    }
    if (!values.comuna) {
      errors.comuna = "Se requiere comuna del evento";
    }
    if (!values.descripcion) {
      errors.descripcion = "Se requiere descripcion del evento";
    }
    if (!values.sinopsis) {
      errors.sinopsis = "Se requiere sinopsis del evento";
    }
    if (!values.duracion) {
      errors.duracion = "Se requiere duracion del evento";
    }
    if (!values.precio) {
      errors.precio = "Se requiere precio del evento";
    }
    if (!values.imagen) {
      errors.imagen = "Se requiere imagen del evento";
    }

    return errors;
  };

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
              onChange={handleChange}
            ></input>
            <div className="text-danger" style={{fontSize:"12px"}}>{formErrors.nombre}</div>
            <div className="form-check-label">Ingresar categoria</div>
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue={1}
              name="categoria_id"
              onChange={handleChange}
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
              onChange={handleChange}
            ></input>
            <div className="text-danger" style={{fontSize:"12px"}}>{formErrors.locacion}</div>
            <div className="form-check-label">Ingresar Comuna</div>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de comuna"
              name="comuna"
              onChange={handleChange}
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
              onChange={handleChange}
            ></textarea>
            <div className="text-danger" style={{fontSize:"12px"}}>{formErrors.descripcion}</div>
            <div className="form-check-label">Ingresar sinopsis</div>
            <textarea
              className="form-control"
              id="floatingTextarea2"
              name="sinopsis"
              onChange={handleChange}
            ></textarea>
            <div className="text-danger" style={{fontSize:"12px"}}>{formErrors.sinopsis}</div>
            <div className="form-check-label">Ingresar precio</div>
            <input
              type="number"
              min={1000}
              className="form-control"
              name="precio"
              onChange={handleChange}
            ></input>
            <div className="text-danger" style={{fontSize:"12px"}}>{formErrors.precio}</div>
            <div className="form-check-label">Duracion</div>
            <input
              type="number"
              min={1}
              className="form-control"
              placeholder="Duracion evento en horas"
              name="duracion"
              onChange={handleChange}
            ></input>
            <div className="text-danger" style={{fontSize:"12px"}}>{formErrors.duracion}</div>
            <div className="form-check-label">Ingresar URL de imagen</div>
            <input
              type="text"
              className="form-control"
              name="imagen"
              onChange={handleChange}
            ></input>
            <div className="text-danger" style={{fontSize:"12px"}}>{formErrors.imagen}</div>
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
