import React from "react";
import style from "./About.module.css";
import AboutCard from "../../components/AboutCard/AboutCard";
import { members } from './AboutMembers';
import Marquee from "react-fast-marquee";
import { skillsData } from "./SkillsData";
import { skillsImage } from "./SkillsImage";

const About = () => {
  return (
    <div className={style.container}>
 {members.length > 0 ? (
        members.map((miembro) => {
          return (
            <div key={miembro.id} className={style.aboutCard}>
              <AboutCard
                id={miembro.id}
                imagen={miembro.imagen}
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
          <h1>No se encontraron miembros con esos parámetros</h1>
        </div>
      )}
      {/* <h1>Tecnologias Utilizadas:</h1> */}
       <div className={style.skillsContainer}>
              <div className={style.skillScroll}>
                <Marquee
                  gradient={false}
                  speed={50}
                  pauseOnClick={true}
                  delay={0}
                  play={true}
                  direction="right"
                >
                  {skillsData.map((skill, id) => (
                    <div className={style.skillBox} key={id}>
                      <img
                        className={style.skillImage}
                        src={skillsImage(skill)}
                        alt={skill}
                      />
                      <p>{skill}</p>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
    </div>
  );
};
export default About;
