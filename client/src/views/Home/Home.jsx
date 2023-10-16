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
import { getCart, updateCart, postCart } from "../../redux/actions";

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
  useEffect(() => {
    const comb = [filters.productType, filters.material, filters.color, sort];
    filters.productType =
      filters.productType === "allProductTypes" ? "" : filters.productType;
    filters.material =
      filters.material === "allMaterials" ? "" : filters.material;
    filters.color = filters.color === "allColors" ? "" : filters.color;

    const uri = `http://localhost:3001/product?productTypeId=${filters.productType}&materialId=${filters.material}&colorId=${filters.color}&orderBy=price&orderDirection=${sort}`;
    console.log(uri);

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
  }, [
    sort,
    filters.productType,
    filters.color,
    filters.material,
    filters.price,
    dispatch,
  ]);

  useEffect(() => {
    const cartIdParse = cartId != null && JSON.parse(cartId);
    if (isAuthenticated && cartIdParse) {
      dispatch(getCart(cartIdParse));
    }
  }, []);

  useEffect(() => {
    const userParse = cartId != null && JSON.parse(user);
    const cartIdParse = cartId != null && JSON.parse(cartId);
    const newProducts = cartProducts.map((item) => ({
      id: item.id,
      quantity: item.count,
    }));

    const data = {
      userId: userParse.userId,
      products: newProducts,
    };
    if (isAuthenticated && !cartIdParse) {
      if (userParse.cartId === undefined) {
        dispatch(postCart(data));
      }
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
