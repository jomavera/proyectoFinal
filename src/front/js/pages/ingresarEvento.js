import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes, { objectOf } from "prop-types";
import { Context } from "../store/appContext";
import { FormularioNuevoEvento } from "../component/formularioNuevoEvento";

export const IngresarEvento = (props) => {
  const { store, actions } = useContext(Context);
  const [admin, setAdmin] = useState(false);
  const history = useHistory();

  if (sessionStorage.token === null) {
    history.push("/login");
  }

  async function chequearAdmin() {
    const opciones = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.token,
      },
    };
    try {
      const resp = await fetch(
        `${process.env.BACKEND_URL}/api/check_role`,
        opciones
      );
      if (resp.status == 200) {
        setAdmin(true);
      }
    } catch (error) {
      console.error(`Check admin error: ${error}`);
    }
  }

  useEffect(() => {
    chequearAdmin();
  }, []);

  return (
    <div>
      {admin ? (
        <FormularioNuevoEvento />
      ) : (
        <div className="h1 text-center m-5">Usuario no es administrador</div>
      )}
    </div>
  );
};

IngresarEvento.propTypes = {
  match: PropTypes.object,
};
