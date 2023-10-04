import Card from "../Card/Card"; //correcion
import "./Cardscontainer.style.css";

const CardsContainer = ({ currentProducts }) => {
  return (
    <div className="container">
      {currentProducts.map((m) => {
        return (
          <div className="card" key={m.id}>
            <Card
              name={m.name}
              color={m.color}
              description={m.description}
              id={m.id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainer;
