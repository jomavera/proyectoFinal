import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../styles/perfil.css";


import { Context } from "../store/appContext";

export const Perfil = () => {
	const { store, actions } = useContext(Context);

	const history = useHistory();
	useEffect(() => {

		if (store.token && store.token != "" && store.token != undefined) actions.getMessage()

	}, [store.token])

	const datosPerfil = store.message

	// console.log(data)
	//console.log(store.message[params.theid].name)
	return (
		<>
			{/* // <div className="container">
		// 	<div className="row justify-content-center">
				
		// 		<h3 className="row justify-content-center">Mi datos de perfil</h3>
		// 		<div className="col-5 login-form-1">

		// 		<h2>Nombre</h2>
		// 			<h3>{datosPerfil.name} {datosPerfil.lastname}  </h3>
		// 			<h2>Correo</h2>
		// 			<h3>{datosPerfil.email}</h3>


		// 		</div>
		// 	</div>

		// </div> */}
			<div className="row rowPadding justify-content-center">
				<div className="col-6">
					<h3 className="row ">Mi datos de perfil</h3>
					<div className="row login-form-1">
						<div className="d-flex flex-column">
							<div className="col"><h2>Nombre</h2>
								<div className="letra">{datosPerfil.name} {datosPerfil.lastname}  </div></div>
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
						<span href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</span>
					</Link>
				</div>
			</div>
			</>
			);
};
