//Home.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import Paginacion from "../../components/Paginacion/Paginacion";
import ToolBar from "../../components/ToolBar/ToolBar";
// import { setProductsCopy } from "../../redux/actions";
import style from "./Home.module.css";
import { useCheckUserExists } from "../../helpers/checkUserExist";
import { useAuth0 } from "@auth0/auth0-react";
import { getCart, postCart } from "../../redux/actions";

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const dispatch = useDispatch();
  const checkUserExist = useCheckUserExists();
  const user = localStorage.getItem("user");
  const cartId = localStorage.getItem("cartId");
  const { isAuthenticated } = useAuth0();
  const cartProducts = useSelector((state) => state.cartProducts);

  useEffect(() => {
    checkUserExist();
    // dispatch(setProductsCopy());
    // eslint-disable-next-line
  }, []);

  // useSelectors para observar el estado global donde haga falta
  const globalProducts = useSelector((state) => state.muebles); //trae todos los muebles
  const filters = useSelector((state) => state.filter); //
  const sort = useSelector((state) => state.sort);
  // const materialList = useSelector((state) => state.materialState);
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
  useEffect(
    () => {
      filters.productType =
        filters.productType === "allOptions" ? "" : filters.productType;
      filters.material =
        filters.material === "allOptions" ? "" : filters.material;
      filters.color = filters.color === "allOptions" ? "" : filters.color;

      const uri = `http://localhost:3001/product?productTypeId=${
        filters.productType
      }&materialId=${filters.material}&colorId=${
        filters.color
      }&orderBy=price&orderDirection=${sort === "allOptions" ? "" : sort}`;

      axios
        .get(uri)
        .then((response) => {
          const list = response.data; // Array con el resultado del filtro
          setProducts(list); // Actualizar el estado local
          setCurrentPage(1);
        })
        .catch((error) => {
          console.error("Error al hacer la solicitud:", error);
        });
    },
    // eslint-disable-next-line
    [sort, filters.productType, filters.color, filters.material, filters.price]
  );

  useEffect(() => {
    const cartIdParse = cartId != null ? JSON.parse(cartId) : undefined;
    if (isAuthenticated && cartIdParse != undefined) {
      dispatch(getCart(cartIdParse));
    }
  }, []);

  useEffect(() => {
    const userParse = cartId != null && JSON.parse(user);
    const cartIdParse = cartId != null ? JSON.parse(cartId) : undefined;
    const newProducts = cartProducts.map((item) => ({
      id: item.id,
      quantity: item.count,
    }));

    const data = {
      userId: userParse.userId,
      products: newProducts,
    };
    if (
      isAuthenticated &&
      cartIdParse === undefined &&
      data.products.length > 0
    ) {
      dispatch(postCart(data));
    }
  }, [cartProducts]);

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
