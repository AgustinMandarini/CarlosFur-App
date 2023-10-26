import React from "react";
import style from "./AboutCard.module.css";
import { AiFillGithub, AiOutlineLinkedin } from 'react-icons/ai';


const AboutCard = (props) => {
  return (
    <div className={style.card}>
        <img src={props.imagen} alt="imagenPerfil" className={style.imagen}/>
        <h1 className={style.titulo}>{props.name}</h1>
        <h2 className={style.subTitulo}>{props.subTitle}</h2>
        <hr />
        <div>
        <a href={props.github} target="_blank" rel="noopener noreferrer">
        <AiFillGithub size={32} color="black" />
        </a>
        <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
        <AiOutlineLinkedin size={32} color="black"/>
        </a>
        </div>
        
    </div>
  );
};
export default AboutCard;
