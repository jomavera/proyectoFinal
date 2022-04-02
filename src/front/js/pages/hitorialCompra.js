import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const HistorialCompra = () => {
	const { store, actions } = useContext(Context);

	const history = useHistory();
	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined) actions.getHistorialCompra()

	}, [store.token])

	const datosHistorialCompra = store.historialCompra
    console.log( datosHistorialCompra)
	console.log(datosHistorialCompra['fecha'])
	return (
		<>
	
		<span>{datosHistorialCompra["fecha"]}</span>
		</>
	);
};
