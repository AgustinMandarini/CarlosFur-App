import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import React, { useEffect } from "react";
import { useState } from "react";
import mueblesData from "../../muebles.json";
import Pagination from "../../components/Pagination/Pagination";
import { getMuebles } from "../../redux/actions";

const Home = () => {
  const [muebles, setMuebles] = useState(mueblesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [mueblesPerPage] = useState(5);
  const indexOfLastRecipe = currentPage * mueblesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - mueblesPerPage;
  const currentMuebles = muebles.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    getMuebles();
  }, []);

  return (
    <div>
      <h1>Volvieron las Sillas 2x1!</h1>
      <Pagination
        mueblesPerPage={mueblesPerPage}
        totalMuebles={muebles.length}
        paginate={paginate}
      />
      <CardsContainer currentMuebles={currentMuebles}></CardsContainer>
    </div>
  );
};

export default Home;
