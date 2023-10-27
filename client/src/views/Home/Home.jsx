//Home.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/Cardscontainer";
import Paginacion from "../../components/Paginacion/Paginacion";
import ToolBar from "../../components/ToolBar/ToolBar";
import style from "./Home.module.css";
import { useCheckUserExists } from "../../helpers/checkUserExist";
import { getCart, postCart } from "../../redux/actions";
import { IconArrowBigDownLineFilled } from "@tabler/icons-react";
const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const dispatch = useDispatch();
  const checkUserExist = useCheckUserExists();
  const user = localStorage.getItem("user");
  const cartId = localStorage.getItem("cartId");
  const cartProducts = useSelector((state) => state.cartProducts) || [];

  useEffect(() => {
    checkUserExist();
    // dispatch(setProductsCopy());
    // eslint-disable-next-line
  }, []);
  // useSelectors para observar el estado global donde haga falta
  const globalProducts = useSelector((state) => state.muebles); //trae todos los muebles
  const filters = useSelector((state) => state.filter); //
  const sort = useSelector((state) => state.sort);
  const nameState = useSelector((state) => state.nameState);

  // Paginado
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const indexOfLastRecipe = currentPage * productsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentProducts = products.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const userIsAuthenticated = localStorage.getItem("token") !== null;

  useEffect(() => {
    setProducts(globalProducts);
  }, [globalProducts]);

  //Combinación de ordenamientos y filtros
  useEffect(
    () => {
      if (nameState !== true) {
        filters.productType =
          filters.productType === "allOptions" ? "" : filters.productType;
        filters.material =
          filters.material === "allOptions" ? "" : filters.material;
        filters.color = filters.color === "allOptions" ? "" : filters.color;
        filters.productType =
          filters.productType === "allOptions" ? "" : filters.productType;
        filters.material =
          filters.material === "allOptions" ? "" : filters.material;
        filters.color = filters.color === "allOptions" ? "" : filters.color;
        filters.productType =
          filters.productType === "allOptions" ? "" : filters.productType;
        filters.material =
          filters.material === "allOptions" ? "" : filters.material;
        filters.color = filters.color === "allOptions" ? "" : filters.color;

        const uri = `${apiUrl}/product?productTypeId=${
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
      }
    },
    // eslint-disable-next-line
    [sort, filters.productType, filters.color, filters.material, filters.price]
  );

  useEffect(() => {
    const cartIdParse = cartId != null ? JSON.parse(cartId) : undefined;
    if (userIsAuthenticated && cartIdParse != undefined) {
      dispatch(getCart(cartIdParse));
    }
  }, []);

  useEffect(() => {
    const userParse = cartId != null && JSON.parse(user);
    const cartIdParse = cartId != null ? JSON.parse(cartId) : undefined;
    const newProducts = cartProducts
      .filter((item) => item && item.id !== undefined)
      .map((item) => ({
        id: item.id,
        quantity: item.count,
      }));

    const data = {
      userId: userParse.userId,
      products: newProducts,
    };
    if (
      userIsAuthenticated &&
      cartIdParse === undefined &&
      data.products.length > 0
    ) {
      dispatch(postCart(data));
    }
  }, [cartProducts]);
  //no
  return (
    <div className={style.cntnHome}>
      <div className={style.divImg}></div>
      <IconArrowBigDownLineFilled
        className={style.icon}
        stroke="5px"
        size="31px"
      />
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
