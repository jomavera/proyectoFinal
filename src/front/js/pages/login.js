import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import "../../styles/footer.css";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        const opciones = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };
        fetch('https://3001-jomavera-proyectofinal-dbjxjyhhttw.ws-us38.gitpod.io/api/token', opciones)
            .then(response => response.json())
            .then(data => { 
                console.log("ingo backend",data)
                sessionStorage.setItem('token', data.access_token)}
            )
            .then()
            .catch(error => console.log('ERROR FECTH TOKEN', error))
    }

    return (
        <>
            <div className="container login-container">
                <div className="row justify-content-center">
                    <div className="col-md-6 login-form-1">
                        <h3>Inicia sesión para entrar a tu cuenta</h3>
                        <label>Correo Electronico</label>

                        <input type="text" placeholder="" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Ingrese Contraseña</label>
                        <input type="password" placeholder="" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="btn btn-primary" onClick={handleClick}>Entrar</button>
                    </div>

                </div>
            </div>
        </>
    );
};
