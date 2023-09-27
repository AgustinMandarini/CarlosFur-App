import React from "react";
import style from "./Detail.module.css";

import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  return (
    <div>
      <Link to="/home">Volver</Link>
      <div>
        <p>Nombre: </p>
        <p>Altura: </p>
        <p>Peso: </p>
        <p>Tipo de madera: </p>
      </div>
    </div>
  );
};

export default Detail;
