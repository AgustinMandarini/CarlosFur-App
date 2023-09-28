import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import React from "react";
import { useState } from "react";
import mueblesData from "../../muebles.json";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const [muebles, setMuebles] = useState(mueblesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [mueblesPerPage] = useState(5);

  const indexOfLastRecipe = currentPage * mueblesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - mueblesPerPage;
  const currentMuebles = muebles.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Volvieron las Sillas 2x1!</h1>
      <Pagination
        recipesPerPage={mueblesPerPage}
        totalRecipes={muebles.length}
        paginate={paginate}
      />
      <CardsContainer></CardsContainer>
    </div>
  );
};

export default Home;
