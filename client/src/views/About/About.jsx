import React from "react";
import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.cntnAbout}>
      <h1>Quienes Somos</h1>
      <div className={style.line}></div>
      <div className={style.divText}>
        <p>
          ​Te presentamos a Hogar, la cadena de equipamiento y artículos para el
          hogar, pensada para vos y tu familia. Nació a fines de 2004, buscando
          satisfacer las necesidades de las familias que desean amoblar y
          equipar sus hogares con productos de calidad, estilo y diseño con la
          posibilidad de una financiación flexible y acorde a cada necesidad.
          Así, fuimos creciendo para acercarnos más a vos. Hoy estamos presentes
          en Mendoza con tres puntos de venta (esto es mentira)
        </p>
        <p className={style.pSubtitle}>
          <strong>¿Como comprar?</strong>
        </p>
        <p>
          ​Te presentamos a Hogar, la cadena de equipamiento y artículos para el
          hogar, pensada para vos y tu familia. Nació a fines de 2004, buscando
          satisfacer las necesidades de las familias que desean amoblar y
          equipar sus hogares con productos de calidad, estilo y diseño con la
          posibilidad de una financiación flexible y acorde a cada necesidad.
          Así, fuimos creciendo para acercarnos más a vos. Hoy estamos presentes
          en Mendoza con tres puntos de venta (esto es mentira)
        </p>
      </div>
    </div>
  );
};
export default About;
