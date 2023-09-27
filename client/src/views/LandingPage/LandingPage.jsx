import style from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";

const LandingPage = () =>{
  
    return (
        <div className={style.container}>
            <h1>Bienvenidos!!</h1>
            <NavLink to="/home" className={style.botonIngresar}>Ingresar</NavLink>
        </div>
    ) 
    }
    
    export default LandingPage