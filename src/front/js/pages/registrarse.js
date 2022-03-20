import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";


import { Context } from "../store/appContext";

export const Registrarse = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <form>
                            <h3>Registrate a una cuenta gratis</h3>

                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" className="form-control" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label>Apellido</label>
                                <input type="text" className="form-control" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label>Correo Electronico</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Contraseña</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            <p className="forgot-password text-right">
                                Already registered <a href="#">sign in?</a>
                            </p>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};
