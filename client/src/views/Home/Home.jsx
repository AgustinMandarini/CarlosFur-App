import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import Pagination from "../../components/Pagination/Pagination";
// import mueblesData from "../../muebles.json";
import {
  getMuebles,
  getProductType,
  setProductsCopy,
  getMuebleName
} from "../../redux/actions";
import { getMuebles, getProductType, getMuebleName } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductsCopy);
    // eslint-disable-next-line
  }, []);

  // useSelectors para observar el estado global donde haga falta
  const globalProducts = useSelector((state) => state.muebles);
  const allMuebles = useSelector((state) => state.allMuebles);
  const sort = useSelector((state) => state.sort);

  // Paginado
  const [muebles, setMuebles] = useState(allMuebles);
  console.log(muebles);
  const [currentPage, setCurrentPage] = useState(1);
  const [mueblesPerPage] = useState(5);
  const indexOfLastRecipe = currentPage * mueblesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - mueblesPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentMuebles = muebles.slice(indexOfFirstRecipe, indexOfLastRecipe);

  //Combinación de ordenamientos y filtros
  useEffect(() => {
    const list = globalProducts.sort((a, b) => {
      if (sort === "Z-a") {
        return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
      }

      if (sort === "A-z") {
        return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
      }
      if (sort === "H-L") {
        return a.healthScore > b.healthScore ? -1 : 1;
      }
      if (sort === "L-H") {
        return a.healthScore < b.healthScore ? -1 : 1;
      }
      return 0;
    });
    console.log({ list, sort });

    setMuebles(list);
    dispatch(setProductsCopy(list));
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [sort]);

  return (
    <div>
      <h1>Volvieron las Sillas 2x1!</h1>
      <Pagination
        mueblesPerPage={mueblesPerPage}
        totalMuebles={allMuebles.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <CardsContainer currentMuebles={currentMuebles}></CardsContainer>
    </div>
  );
};

export default Home;
