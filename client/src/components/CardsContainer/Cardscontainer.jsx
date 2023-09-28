import Card from "../Card/Card"; //correcion
import "./Cardscontainer.style.css";
import mueblesData from "../../muebles.json";

const CardsContainer = () => {
  return (
    <div className="container">
      {mueblesData.map((m) => {
        return (
          <div className="card">
            <Card
              id={m.id}
              nombre={m.nombre}
              color={m.color}
              descripcion={m.descripcion}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainer;
