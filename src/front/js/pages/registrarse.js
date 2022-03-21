import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { useHistory } from "react-router-dom";

import { Context } from "../store/appContext";

export const Registrarse = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const history = useHistory();

    const handleClick = () => {
        actions.registrarse(name, lastname, email, password).then(() => {
           
            history.push('/registrado')
        })
    }

    return (
        <>
            <div className="container-fluid login-container">
                <div className="row justify-content-center">
                    <div className="col-md-auto login-form-1">

                        <h3>Registrate a una cuenta gratis</h3>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Nombre</label>
                                <input type="text" className="form-control" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="form-group col-6">
                                <label>Apellido</label>
                                <input type="text" className="form-control" placeholder="" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                            </div>
                        </div>

                        <label>Correo Electronico</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />


                        <label>Contraseña</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />


                        <button onClick={handleClick} className="btn btn-primary btn-block">Sign Up</button>



                    </div>
                </div>
            </div>
        </>
    );
};
