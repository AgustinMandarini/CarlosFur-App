import React from "react";
import style from "./AboutCard.module.css";


const AboutCard = (props) => {
  return (
    <div className={style.card}>
        <img src={props.imagen} alt="imagenPerfil" className={style.imagen}/>
        <h1 className={style.titulo}>{props.name}</h1>
        <h2 className={style.subTitulo}>{props.subTitle}</h2>
    </div>
  );
};
export default AboutCard;
