import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/historialCompra.css";

export const HistorialCompra = () => {
	const { store, actions } = useContext(Context);

	const history = useHistory();

	useEffect(() => {

		if (store.token && store.token != "" && store.token != undefined) actions.getHistorialCompra()

		if (store.token == "") actions.logout()

	}, [store.token])

	if (store.token == null) return <>No tienes acceso para ver la pagina</>

	const historial = store.historialCompra

	const data = []
	historial.map((item) => {
		let fecha = new Date(item.fecha)
		let dia = fecha.getDate();
		let mes = fecha.getMonth();
		let anio = fecha.getFullYear();
		const fechacompleta = `${dia + 1}/${mes + 1}/${anio}`
		data.push({ "fecha": fechacompleta, "hora": item.hora, "duracion": item.duracion, "ticket_id": item.ticket_id, "categoria": item.categoria, "precio": item.precio, "locacion": item.locacion, "name_event": item.name_event, "ubicacion": item.ubicacion })
	})

	//if(data == '') return <>Cargando</>

	if (historial == 0 || historial == null || historial == "") {

		return (
			<>
				<div className="row justify-content-center registro noCompra">
					<div className="col-6">
						<div className="login-form-1">NO HAY COMPRAS REALIZADAS</div>
					</div>
				</div>

			</>

		)
	}

	console.log(data, "data")


	return (

		<>
			<div className="container-fluid col-8">
				<div className="titulo">
					<h2 className="">Historial de compras</h2>
				</div>
				<table className="table tabla">
					<thead>
						{ }
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nombre del evento</th>
							<th scope="col">Fecha</th>
							<th scope="col">Hora</th>
							<th scope="col">Duración</th>
							<th scope="col">Categoria</th>
							<th scope="col">Precio</th>
							<th scope="col">Locación</th>
							<th scope="col">Ubicación</th>
						</tr>
					</thead>
					<tbody>
						{data.map((value, index) => (
							<tr>
								<th key={index} scope="row">{index + 1}</th>
								< td >{value.name_event}</td>
								< td className="fecha">{value.fecha}</td>
								< td >{value.hora}</td>
								< td >{value.duracion}</td>
								< td >{value.categoria}</td>
								< td >{value.precio}</td>
								< td >{value.locacion}</td>
								< td >{value.ubicacion}</td>
							</tr>
						))}
					</tbody>
				</table>

			</div>
		</>
	);
};
