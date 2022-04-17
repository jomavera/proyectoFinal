import React, { useContext, useState, useEffect, } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Box } from "../component/box.js";
import { Cards } from "../component/cards.js";
import Select from 'react-select'

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [datos, setDatos] = useState([]);
  const [categorias, setCategorias] = useState("")
  const [selectedOption, setSelectedOption] = useState("");
  const [datosEventos, setDatosEventos] = useState([])
  const [busqueda, setBusqueda] = useState("");
  const [texto, setTexto] = useState("");
  const [filtrando, setFiltrando] = useState("");


  const options = [
    { value: '1', label: 'Categoria' },
    { value: '2', label: 'Nombre del teatro' },
    { value: '3', label: 'Nombre del evento' },
    { value: '4', label: 'Comuna' },
  ];



  useEffect(() => {
    actions.limpiarSeleccion();
    actions.obtenerDatosEventos().then(() => {
      setDatosEventos(store.eventos)
      setFiltrando(store.eventos)
    })
  }, []);


  const handleClick = (e) => {
    e.preventDefault()
    filtrar(texto)

  }

  const handleTodos = (e) => {
    e.preventDefault()
    console.log("click")
    setDatosEventos(store.eventos)
  }

  const filtrar = (texto) => {

    const filtrado = filtrando.filter((elemento) => {

      if (elemento.nombre_categoria.toLocaleLowerCase() == texto.toLowerCase() && selectedOption.value == 1) {
        return elemento
      }

      if (elemento.titulo.toString().toLowerCase() == texto.toLocaleLowerCase() && selectedOption.value == 3) {
        return elemento
      }
      if (elemento.comuna.toString().toLowerCase() == texto.toLocaleLowerCase() && selectedOption.value == 4) {
        return elemento
      }
      if (elemento.nombre_locacion.toString().toLowerCase() == texto.toLocaleLowerCase() && selectedOption.value == 2) {
        return elemento
      }

    })
    console.log(filtrado, "elemento filtradow")

    if (filtrado == "") {
      return alert("No existen datos con los filtros ingresados")

    }
    setDatosEventos(filtrado)
  }


  console.log(datosEventos)

  return (
    <div className="container-fluid" style={{ backgroundColor: "#e9ecef" }}>
      <div className="row pt-5">
        <div className="col-2"></div>
        <div className="col-5">
          <h1 style={{ fontFamily: "Montserrat" }}>Que quieres hacer hoy?</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col"></div>
        <div className="col text-center">
          <Box texto="Disfrutar un obra de teatro" enlace="/" />
        </div>
        <div className="col text-center ">
          <Box texto="Ver una película junto amigos" enlace="/" />
        </div>
        <div className="col text-center">
          <Box
            texto="Ir a un concierto de un artista que me gusta"
            enlace="/"
          />
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="container">
          <hr></hr>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-2"></div>
        <div className="col-4">
          <h1 style={{ fontFamily: "Montserrat" }}>Oferta eventos</h1>
        </div>


        <div className="col-5"></div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <form>

              <div className="col">
                <label htmlFor="">Filtro de búsqueda:</label>
                <input
                  className="form-control inputBuscar"
                  value={texto}
                  placeholder="Ingrese texto"
                  onChange={(e) => setTexto(e.target.value)}
                />
              </div>

              <div className="col">
                <label htmlFor="Categoria">Selecciona el filtro de búsqueda:</label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="Filtar"
                />
              </div>

              <div>

                <button className="btn btn-primary mt-2" type="" value="Buscar" onClick={(e) => handleClick(e)}>Buscar</button>

              
              </div>
            </form>
          </div>
          <div className="col-sm-5">

       
          </div>

          <div className="col-sm-4 mt-5">

          <button className="btn btn-primary btn-lg" type="" value="Buscar" onClick={(e) => handleTodos(e)}>Listar todos los eventos</button>

          </div>


        </div>

      </div>

      <div className="col"> <Cards cartas={datosEventos} />
      </div>

    </div>

  );
};
