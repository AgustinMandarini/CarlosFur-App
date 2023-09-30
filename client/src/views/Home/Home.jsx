import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import Pagination from "../../components/Pagination/Pagination";
import mueblesData from "../../muebles.json";
import { getMuebles, getProductType } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Home = () => {
  const [muebles, setMuebles] = useState(mueblesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [mueblesPerPage] = useState(5);
  const indexOfLastRecipe = currentPage * mueblesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - mueblesPerPage;
  const currentMuebles = muebles.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMuebles());
    dispatch(getProductType())
  }, []);

  return (
    <div>
      <h1>Volvieron las Sillas 2x1!</h1>
      <Pagination
        mueblesPerPage={mueblesPerPage}
        totalMuebles={muebles.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <CardsContainer currentMuebles={currentMuebles}></CardsContainer>
    </div>
  );
};

export default Home;
