import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import Paginacion from "../../components/Paginacion/Paginacion";
import ToolBar from "../../components/ToolBar/ToolBar";
import { setProductsCopy, postUser } from "../../redux/actions";
import style from "./Home.module.css";
import { useCheckUserExists } from "../../helpers/checkUserExist";

const Home = () => {
  const dispatch = useDispatch();
  const checkUserExist = useCheckUserExists();

  useEffect(() => {
    checkUserExist();
    dispatch(setProductsCopy());
    // eslint-disable-next-line
  }, []);

  // useSelectors para observar el estado global donde haga falta
  const globalProducts = useSelector((state) => state.muebles);
  const filters = useSelector((state) => state.filter);
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
    const list = sortedProducts
      // eslint-disable-next-line
      .filter((product) => {
        if (filters.productType === "allProductTypes") {
          return true;
        }
        if (
          product.productType !== null &&
          product.productType.name &&
          product.productType.name
            .toLowerCase()
            .includes(filters.productType.toLowerCase())
        ) {
          return true;
        }
      })
      // eslint-disable-next-line
      .filter((product) => {
        if (filters.color === "allColors") {
          //(payload)
          return true;
        }
        if (product.colorId !== null && product.colorId == filters.color) {
          return true;
        }
      })

      // eslint-disable-next-line
      .filter((product) => {
        if (filters.price.length === 1) {
          return true;
        }
        if (
          product.price !== null &&
          filters.price.includes(product.price.toString())
        ) {
          return true;
        }
      })
      .sort((a, b) => {
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
    console.log({ list, sort, filters });

    setProducts(list); // Actualizar el estado local
    dispatch(setProductsCopy(list)); // Despachar la acción con la lista ordenada
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [sort, filters.productType, filters.color, filters.price, dispatch]);

  return (
    <div className={style.cntnHome}>
      <h1 className={style.tittle}>MSC AMOBLAMIENTOS</h1>
      <div>
        <ToolBar />
      </div>
      <CardsContainer currentProducts={currentProducts}></CardsContainer>
      <Paginacion
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
