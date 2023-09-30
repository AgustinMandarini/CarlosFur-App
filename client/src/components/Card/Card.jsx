import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={style.container} key={props.id}>
      <Link to={`/detail/${props.id}`} className={style.nameCard}>
        <h1>Name: {props.name}</h1>
        <p>Descripcion: {props.description}</p>
        <p>Color: {props.color} </p>
      </Link>
    </div>
  );
};

export default Card;
