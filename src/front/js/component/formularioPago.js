import React, { useEffect, useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import Card from "react-credit-cards";

const INITIAL_STATE = {
  cvc: "",
  cardExpirationMonth: "",
  cardExpirationYear: "",
  focus: "cardNumber",
  cardholderName: "",
  cardNumber: "",
  issuer: "",
};

export const FormularioPago = (props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [cardFormState, setCardForm] = useState(null);

  useEffect(() => {
    const mp = new MercadoPago("TEST-3dc70a75-1bf6-46aa-834d-a589926d8996");
    const cardForm = mp.cardForm({
      amount: props.monto,
      autoMount: true,
      form: {
        id: "form-checkout",
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular de la tarjeta",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número de la tarjeta",
        },
        cardExpirationDate: {
          id: "form-checkout__cardExpirationDate",
          placeholder: "Fecha de vencimiento (MM/YYYY)",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de seguridad",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Cuotas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número de documento",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emisor",
        },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error)
            return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);

          // Animate progress bar
          const progressBar = document.querySelector(".progress-bar");
          progressBar.removeAttribute("value");

          return () => {
            progressBar.setAttribute("value", "0");
          };
        },
      },
    });
    setCardForm(cardForm);
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const cardData = cardFormState.getCardFormData();
    console.log("CardForm data available: ", cardData);
    const {
      paymentMethodId: payment_method_id,
      issuerId: issuer_id,
      cardholderEmail: email,
      amount,
      token,
      installments,
      identificationNumber,
      identificationType,
    } = cardFormState.getCardFormData();

    if (token) {
      const response = await fetch(
        "https://3001-jomavera-proyectofinal-f1p84es4rkr.ws-us38.gitpod.io/api/procesarpago",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: "Descripción del producto",
            payer: {
              email,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
            evento_id: props.eventoId,
            ubicaciones: props.ubicaciones,
            fecha: props.fecha,
          }),
        }
      );
      let data = await response.json();
      console.log(data);
    }
  }

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5">
          <Card
            cvc={state.cvc}
            expiry={state.cardExpirationMonth + state.cardExpirationYear}
            name={state.cardholderName}
            number={state.cardNumber}
            focused={state.focus}
            brand={state.issuer}
          />
        </div>
        <div className="col mt-2">
          <div className="h4 text-center" style={{ fontFamily: "Montserrat" }}>
            Ingresar datos de tarjeta de credito
          </div>
          <form
            id="form-checkout"
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <input
              type="text"
              name="cardNumber"
              id="form-checkout__cardNumber"
              placeholder="Número de la tarjeta"
              className="form-control m-1"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="text"
              name="cardExpirationDate"
              id="form-checkout__cardExpirationDate"
              placeholder="Fecha de vencimiento (MM/YYYY)"
              className="form-control m-1"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="text"
              name="cardholderName"
              id="form-checkout__cardholderName"
              placeholder="Titular de la tarjeta"
              className="form-control m-1"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="email"
              name="cardholderEmail"
              id="form-checkout__cardholderEmail"
              placeholder="E-mail"
              className="form-control m-1"
            />
            <input
              type="text"
              name="securityCode"
              id="form-checkout__securityCode"
              className="form-control m-1"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <select
              name="issuer"
              id="form-checkout__issuer"
              placeholder="Banco emisor"
              className="form-control m-1"
            ></select>
            <select
              name="identificationType"
              id="form-checkout__identificationType"
              placeholder="Tipo de documento"
              className="form-select m-1"
            ></select>
            <input
              type="text"
              name="identificationNumber"
              id="form-checkout__identificationNumber"
              placeholder="Número de documento"
              className="form-control m-1"
            />
            <select
              name="installments"
              id="form-checkout__installments"
              placeholder="Cuotas"
              className="form-select m-1"
            ></select>
            <button
              type="submit"
              id="form-checkout__submit"
              className="btn btn-primary"
            >
              Pagar
            </button>
            <hr></hr>
            <progress value="0" className="progress-bar">
              Cargando...
            </progress>
          </form>
        </div>
      </div>
    </div>
  );
};
