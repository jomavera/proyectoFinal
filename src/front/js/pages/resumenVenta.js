import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import Select from "react-select";

export const ResumenVenta = () => {
  const { store, actions } = useContext(Context);
  const [ventas, SetVentas] = useState([]);
  const history = useHistory();
  const [eventos, setDatosEventos] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [texto, setTexto] = useState("");
  const [filtrando, setFiltrando] = useState("");
  const [datos, setData] = useState("");
  const [admin, setAdmin] = useState(false);

  async function chequearAdmin() {
    const opciones = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.token,
      },
    };
    try {
      const resp = await fetch(
        `${process.env.BACKEND_URL}/api/check_role`,
        opciones
      );
      if (resp.status == 200) {
        setAdmin(true);
      }
    } catch (error) {
      console.error(`Check admin error: ${error}`);
    }
  }
  useEffect(() => {
    // actions.obtenerDatosVenta().then((data) => {
    // 	SetVentas(store.datosVenta)
    // 	setFiltrando(store.datosVenta)
    // 	console.log(data[0].id,"data")
    // })

    if (store.token && store.token != "" && store.token != undefined) {
      chequearAdmin();
      actions.obtenerDatosVenta().then((data) => {
        SetVentas(store.datosVenta);
        setFiltrando(store.datosVenta);
      });
    }


    //if (store.token == "") actions.logout()
  }, [store.token]);

  console.log(ventas.name);
  const options = [
    { value: "1", label: "Nombre del evento" },
    { value: "2", label: "Nombre del usuario" },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    filtrar(texto);
  };

  const handleTodos = (e) => {
    e.preventDefault();

    SetVentas(store.datosVenta);
  };

  console.log(selectedOption.value);
  const filtrar = (texto) => {
    const filtrado = filtrando.filter((elemento) => {
      if (
        elemento.nombre_evento.toLocaleLowerCase() == texto.toLowerCase() &&
        selectedOption.value == 1
      ) {
        return elemento;
      }
      if (
        elemento.name.toLocaleLowerCase() == texto.toLowerCase() &&
        selectedOption.value == 2
      ) {
        return elemento;
      }
    });
    console.log(filtrado, "elemento filtradow");

    if (filtrado == "") {
      return alert("No existen datos con los filtros ingresados");
    }
    SetVentas(filtrado);
  };

  console.log(store.token,"TOKEN")
  if (store.token == null){
  	return (
  		<>
  			<div className="row justify-content-center registro noCompra">
  				<div className="col-6">
  					<div className="login-form-1">No tienes acceso para ver la pagina</div>
  				</div>
  			</div>

  		</>

  	)
  }

  //const ventas = store.datosVenta
  console.log(ventas);
  const data = [];
  let total = [];
  ventas.map((item) => {
    let fecha = new Date(item.fecha);
    let dia = fecha.getDate();
    let mes = fecha.getMonth();
    let anio = fecha.getFullYear();
    const fechacompleta = `${dia + 1}/${mes + 1}/${anio}`;
    data.push({
      fecha: fechacompleta,
      hora: item.hora,
      duracion: item.duracion,
      ticket_id: item.ticket_id,
      precio: item.precio,
      name: item.name,
      nombre_evento: item.nombre_evento,
      ubicacion: item.ubicacion,
      id: item.id,
    });

    total.push(item.precio);
  });

  // console.log(total)
  // const reducer = (acumulador, curretValue) => acumulador+ curretValue
  // console.log(total.reduce(reducer))
  //if(data == '') return <>Cargando</>
  const initialValue = 0;
  const sumWithInitial = total.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  console.log(sumWithInitial);

  if (ventas == 0 || ventas == null || ventas == "") {
    return (
      <>
        <div className="row justify-content-center registro noCompra">
          <div className="col-6">
            <div className="login-form-1">NO HAY COMPRAS REALIZADAS</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>

      {admin ? (
        <div className="container-fluid col-8">
          <div className="titulo">
            <h2 className="">Historial de Ventas</h2>
          </div>
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
              <button
                className="btn btn-primary mt-2"
                type=""
                value="Buscar"
                onClick={(e) => handleClick(e)}
              >
                Buscar
              </button>
            </div>
          </form>

          <table className="table tabla">
            <thead>
              { }
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre del evento</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Duración</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => (
                <tr key={value.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{value.nombre_evento}</td>
                  <td className="fecha">{value.fecha}</td>
                  <td>{value.hora}</td>
                  <td>{value.duracion}</td>
                  <td>{value.name.toUpperCase()}</td>
                  <td>{value.ubicacion}</td>
                  <td>$ {value.precio}</td>
                </tr>
              ))}
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Total :</th>
                <th>$ {sumWithInitial}</th>
              </tr>
            </tbody>
          </table>
          <div className="col">
            <button
              className="btn btn-primary btn-lg"
              type=""
              value="Buscar"
              onClick={(e) => handleTodos(e)}
            >
              Listar todas las ventas
            </button>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center registro noCompra">
        				<div className="col-6">
        				<div className="login-form-1">No tienes acceso para ver la pagina</div>
        				</div>
         			</div>
      )}


      {/* <div className="container-fluid col-8">
        <div className="titulo">
          <h2 className="">Historial de Ventas</h2>
        </div>
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
            <button
              className="btn btn-primary mt-2"
              type=""
              value="Buscar"
              onClick={(e) => handleClick(e)}
            >
              Buscar
            </button>
          </div>
        </form>

        <table className="table tabla">
          <thead>
            {}
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre del evento</th>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Duración</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value.id}>
                <th scope="row">{index + 1}</th>
                <td>{value.nombre_evento}</td>
                <td className="fecha">{value.fecha}</td>
                <td>{value.hora}</td>
                <td>{value.duracion}</td>
                <td>{value.name.toUpperCase()}</td>
                <td>{value.ubicacion}</td>
                <td>$ {value.precio}</td>
              </tr>
            ))}
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Total :</th>
              <th>$ {sumWithInitial}</th>
            </tr>
          </tbody>
        </table>
        <div className="col">
          <button
            className="btn btn-primary btn-lg"
            type=""
            value="Buscar"
            onClick={(e) => handleTodos(e)}
          >
            Listar todas las ventas
          </button>
        </div>
      </div> */}
    </>
  );
};
