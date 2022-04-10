import React from "react";
import { Card } from "./card.js";

export const Cards = (props) => {
  const cartas = props.cartas.map((e, ix) => {
    return (
      <Card
        descripcion={e.descripcion}
        titulo={e.titulo}
        key={ix}
        idEvento={e.id}
        imagen={e.imagen}
      />
    );
  });

  return <div className="row row-cols-3">{cartas}</div>;
};
