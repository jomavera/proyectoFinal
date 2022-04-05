import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { buttonStyle2 } from "../../styles/navbar";

export const PagoExitoso = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="row text-center p-3">
        <div className="col">
          <div style={{ fontFamily: "Montserrat", fontSize: "24px" }}>
            Pago realizado con exito
          </div>
        </div>
      </div>
      <div className="row justify-content-center p-3">
        <div className="col-5">
          <form>
            <div className="mb-3">
              <label for="formFile" className="form-label">
                Enviar confirmación por E-mail
              </label>
              <input
                className="form-control"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={buttonStyle2}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

PagoExitoso.propTypes = {
  match: PropTypes.object,
};
