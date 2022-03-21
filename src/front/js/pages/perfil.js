import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";


import { Context } from "../store/appContext";

export const Perfil = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined) actions.getMessage()
	}, [store.token])

console.log(store.message)
	return (
		<div className="container">
			<div className="row justify-content-center">
				<h3>Mi datos de perfil</h3>
				<div className="col-md-auto login-form-1">
					<h2>Correo</h2>
					<h3>{store.message}</h3>

				</div>
			</div>

		</div>
	);
};
