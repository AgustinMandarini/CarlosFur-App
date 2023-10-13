import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import Paginacion from "../../components/Paginacion/Paginacion";
import ToolBar from "../../components/ToolBar/ToolBar";
import { setProductsCopy } from "../../redux/actions";
import style from "./Home.module.css";
import { useCheckUserExists } from "../../helpers/checkUserExist";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const Home = ({ cartRef }) => {
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
    async function fetchData() {
      try {
        const apiData = await axios.get();
        const list = apiData.data;

        setProducts(list); // Actualizar el estado local
        setCurrentPage(1);
      } catch (error) {
        console.error("Error en la acción getDetail:", error);
      }
    }

    fetchData();

    // eslint-disable-next-line
  }, [sort, filters.productType, filters.color, filters.price]);

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
