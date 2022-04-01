import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { FormularioPago } from "../component/formularioPago";

export const Pago = (props) => {
  const { store, actions } = useContext(Context);
  const monto = store.precio * parseInt(store.numero);
  return (
    <FormularioPago
      monto={monto.toString()}
      eventoId={store.id}
      fecha={store.fecha}
      ubicaciones={store.ubicaciones}
    />
  );
};

Pago.propTypes = {
  match: PropTypes.object,
};
