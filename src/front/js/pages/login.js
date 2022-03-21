import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import "../../styles/footer.css";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const token = sessionStorage.getItem('token')

    const handleClick = () => {
      actions.login(email, password).then(() => {

      })
    }

    if(store.token && store.token !="" && store.token != undefined) history.push('/perfil')

    return (
        <>
            <div className="container-fluid login-container">
                <div className="row justify-content-center">
                <div className="col-md-auto login-form-1">
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
