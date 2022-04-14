import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../styles/perfil.css";


import { Context } from "../store/appContext";

export const Perfil = () => {
	const { store, actions } = useContext(Context);

	const history = useHistory();

	useEffect(() => {
		setTimeout(() => {
			if (store.token && store.token != "" && store.token != undefined)
				actions.getMessage()
		}, 1000)
	}, [store.token])

	if(store.token == ''){
		console.log("vencio el token")
	}


	const datosPerfil = store.message

	if (datosPerfil == 0 || datosPerfil == "") {
		return <>
			<div className="row justify-content-center registro noCompra">
				<div className="col-6">
					<div className="login-form-1">Cargando Información...</div>
				</div>
			</div></>
	}
	return (
		<>

			<div className="row rowPadding justify-content-center">
				<div className="col-6">
					<h3 className="row ">Mi datos de perfil</h3>
					<div className="row login-form-1">
						<div className="d-flex flex-column">
							<div className="col"><h2>Nombre</h2>
								<div className="letra">{datosPerfil.name.toUpperCase()} {datosPerfil.lastname.toUpperCase()}  </div></div>
							<div className="col">
								<h2>Email</h2>
								<div className="letra">{datosPerfil.email}</div>

							</div>

						</div>
					</div>
				</div>

			</div>

			<div className="row row2">

				<div className="btn">
					<Link to="/historial-compra">
						<span href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Ver compras</span>
					</Link>
				</div>
			</div>
		</>
	);
};
