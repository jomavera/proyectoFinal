import React from "react";
import { useHistory } from "react-router-dom";
import { buttonStyle2 } from "../../styles/navbar";

export const PagoNoExitoso = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/`);
  };
  return (
    <div className="container-fluid">
      <div className="row text-center p-3">
        <div className="col">
          <div style={{ fontFamily: "Montserrat", fontSize: "24px" }}>
            Pago no fue realizado con exito!
          </div>
        </div>
      </div>
      <div className="row justify-content-center p-3">
        <div className="col-2">
          <div
            className="btn btn-primary"
            style={buttonStyle2}
            onClick={() => {
              handleClick();
            }}
          >
            Volver al inicio
          </div>
        </div>
      </div>
    </div>
  );
};
