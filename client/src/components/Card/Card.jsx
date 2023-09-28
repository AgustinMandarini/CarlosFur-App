import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css";



const Card = (props) => {
  return (
    <div className="card-container" key={props.id}>
      <Link to={`/detail/${props.id}`} className={style.nameCard}>
        <h1>{props.nombre}</h1>
      </Link>
      <p>Descripcion: {props.descripcion}</p>
      <p>Color: {props.color} </p>
    </div>
  );
};

export default Card;

