import Card from "../Card/Card"; //correcion
import "./Cardscontainer.style.css";

const CardsContainer = ({ currentMuebles }) => {
  return (
    <div className="container">
      {currentMuebles.map((m) => {
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
