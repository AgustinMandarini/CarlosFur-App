import React from "react";
import style from "./Detail.module.css";
import { Link } from "react-router-dom";

const Detail = () => {
  return (
    <div>
      <Link to="/home">Volver</Link>
      <div>Acá va la info</div>
    </div>
  );
};

export default Detail;
