import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { FormularioNuevoEvento } from "../component/formularioNuevoEvento";

export const IngresarEvento = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <FormularioNuevoEvento />
  );
};

IngresarEvento.propTypes = {
  match: PropTypes.object,
};
