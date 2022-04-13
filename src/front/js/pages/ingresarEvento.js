import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { FormularioNuevoEvento } from "../component/formularioNuevoEvento";

export const IngresarEvento = (props) => {
  const { store, actions } = useContext(Context);
  const history = useHistory();

  if (sessionStorage.token === null) {
    history.push("/login");
  }
  return <FormularioNuevoEvento />;
};

IngresarEvento.propTypes = {
  match: PropTypes.object,
};
