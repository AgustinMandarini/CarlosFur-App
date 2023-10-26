import React from "react";
import style from "./About.module.css";
import AboutCard from "../../components/AboutCard/AboutCard";
import { members } from './AboutMembers';
import pelado from "./../../imagenes/pelado.jpg"

const About = () => {
  return (
    <div className={style.container}>
 {members.length > 0 ? (
        members.map((miembro) => {
          return (
            <div key={miembro.id} className={style.aboutCard}>
              <AboutCard
                id={miembro.id}
                imagen={pelado}
                name={miembro.name}
                subTitle={miembro.subTitle}
                github={miembro.github}
                linkedin={miembro.linkedin}
              />
            </div>
          );
        })
      ) : (
        <div className="noProducts">
          <h1>No se encontraron muebles con esos parámetros</h1>
        </div>
      )}
    </div>
  );
};
export default About;
