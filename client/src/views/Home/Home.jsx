import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import Pagination from "../../components/Pagination/Pagination";
import {
  getProducts,
  getProductType,
  setProductsCopy,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ToolBar from "../../components/ToolBar/ToolBar";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductsCopy());
    // eslint-disable-next-line
  }, []);

  // useSelectors para observar el estado global donde haga falta
  const globalProducts = useSelector((state) => state.muebles);
  const allProducts = useSelector((state) => state.allProducts);
  const sort = useSelector((state) => state.sort);

  // Paginado
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const indexOfLastRecipe = currentPage * productsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentProducts = products.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    setProducts(globalProducts);
  }, [globalProducts]);

  //Combinación de ordenamientos y filtros
  useEffect(() => {
    const sortedProducts = [...globalProducts]; // Copia de los muebles globales
    sortedProducts.sort((a, b) => {
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
    // console.log({ sortedProducts, sort });

    setProducts(sortedProducts); // Actualizar el estado local
    dispatch(setProductsCopy(sortedProducts)); // Despachar la acción con la lista ordenada
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [sort]);

  return (
    <div className={style.cntnHome}>
      <h1 className={style.tittle}>MSC AMOBLAMIENTOS</h1>
      <div>
        <ToolBar />
      </div>
      <CardsContainer currentProducts={currentProducts}></CardsContainer>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
