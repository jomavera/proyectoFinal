import React, { useContext, useState, useEffect, } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Box } from "../component/box.js";
import { Cards } from "../component/cards.js";
// import { datos } from "../../../datosPrueba.js";
import Select from 'react-select'

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [datos, setDatos] = useState([]);
  const [categorias, setCategorias] = useState("")
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: '1', label: 'Teatro' },
    { value: '2', label: 'Cine' },
    { value: '3', label: 'Concierto' },
    { value: '4', label: 'Todos los eventos' },
  ];

  const dat = selectedOption.value
  
  const handleClick = (e) => {
    actions.obtenerDatosEventos(dat)

  }


  console.log(selectedOption)


  useEffect(() => {

    actions.obtenerDatosEventos();
    // obtenerDatosEventos();
  }, []);

  store.eventos.map((value, index) => { console.log(value.imagen) })

  console.log(store.eventos, "eventos")
  if (store.eventos == []) {
    return <p>No hay eventos</p>
  }

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
      <div className="row">

        <div className="col-6">

        </div>
        <div className="col-3">
        
        <label htmlFor="Categoria">Busqueda por título:</label>
          <input type="text" name="titulo" />
          <input type="submit" value="Buscar"/>
        </div>
        <div className="col-3">

          <label htmlFor="Categoria">Selecciona la categoría:</label>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder= "Filtar"
          />
          <input type="submit" value="Buscar" onClick={(e) => handleClick(e)} />


        </div>
        <Cards cartas={store.eventos} />
      </div>
      <div className="col"></div>
    </div>

  );
};
