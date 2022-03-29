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
    const [error, setError] = useState(false)


    // function validarEmail(valor) {
    //     if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
    //      //alert("La dirección de email " + valor + " es correcta!.");
    //     } else {
    //      alert("La dirección de email es incorrecta!.");
    //     }
    //   }
    const handleClick = () => {
        
        if (email.length !="" && password.length > 3) {
            
            actions.login(email, password).then((data)=>{
                   if(data==undefined){
                       alert("Error en correo o contraseña")
                   }
            })
        } else {
          
         //  alert("mensaje validacion")
        }

    }

    if (store.token && store.token != "" && store.token != undefined) history.push('/perfil')


    // if (error) {
    //     return (
    //         <>

    //             <p>Problema con las credenciales</p>
    //         </>
    //     )
    // }




    return (
        <>
            <div className="container-fluid login-container">

                <form name="form1" action="#">
                    <div className="row justify-content-center">
                        <div className="col-md-auto login-form-1">
                            <h3>Inicia sesión para entrar a tu cuenta</h3>

                            <div className="form-group">
                                <label htmlFor="inputEmail" className="control-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email" data-error="Bruh, that email address is invalid" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="help-block with-errors"></div>
                            </div>



                            {/* 
                        <label>Correo Electronico</label>

                        <input type="text" placeholder="" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}       onclick="ValidateEmail(document.form1.text1)"/> */}
                            <div className="form-group">
                                <label htmlFor="inputPassword" className="control-label" required>Ingrese Contraseña</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" data-error="Bruh, that email address is invalid" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button className="btn btn-primary" onClick={handleClick}>Entrar</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
};
