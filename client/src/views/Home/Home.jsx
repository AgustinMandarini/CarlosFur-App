import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import Pagination from "../../components/Pagination/Pagination";
import {
  getMuebles,
  getProductType,
  setProductsCopy,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ToolBar from "../../components/ToolBar/ToolBar";
import style from "./Home.module.css";

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
  const [muebles, setMuebles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mueblesPerPage] = useState(5);
  const indexOfLastRecipe = currentPage * mueblesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - mueblesPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentMuebles = muebles.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    setMuebles(globalProducts);
  }, [globalProducts]);

  //Combinación de ordenamientos y filtros
  useEffect(() => {
    const sortedMuebles = [...globalProducts]; // Copia de los muebles globales
    sortedMuebles.sort((a, b) => {
      if (sort === "MC") {
        return a.price > b.price ? -1 : 1;
      }
      if (sort === "MB") {
        return a.price < b.price ? -1 : 1;
      }
      if (sort === "MN") {
        return a.id > b.id ? -1 : 1;
      }
      if (sort === "MV") {
        return a.id < b.id ? -1 : 1;
      }
      return 0;
    });
    console.log({ sortedMuebles, sort });

    setMuebles(sortedMuebles); // Actualizar el estado local
    dispatch(setProductsCopy(sortedMuebles)); // Despachar la acción con la lista ordenada
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [sort]);

  return (
    <div className={style.cntnHome}>
      <h1 className={style.tittle}>MSC AMOBLAMIENTOS</h1>
      <div>
        <ToolBar />
      </div>
      <CardsContainer currentMuebles={currentMuebles}></CardsContainer>
      <Pagination
        mueblesPerPage={mueblesPerPage}
        totalMuebles={muebles.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
