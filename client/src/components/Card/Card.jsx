import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={style.container} key={props.id}>
      <Link to={`/detail/${props.id}`} className={style.nameLink}>
        <img src={props.imagePath} alt="image" className={style.imgCard} />
        <h1 className={style.nameCard}>{props.name}</h1>

        <div className={style.divProps}>
          <p className={style.p}>{props.description}</p>
          <p className={style.p}>{props.color} </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
