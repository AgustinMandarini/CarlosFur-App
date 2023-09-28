import { React, useEffect } from "react";
import style from "./Detail.module.css";
import mueblesData from "../../muebles.json";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const stateDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/home">Volver</Link>
      <div>
        <p>Nombre: {stateDetail.nombre}</p>
        <p>Altura: {stateDetail.altura}</p>
        <p>Profundidad: {stateDetail.profundidad} </p>
        <p>Ancho:{stateDetail.ancho} </p>
        <p>Peso:{stateDetail.peso}</p>
        <p>Color:{stateDetail.color}</p>
        <p>Descripcion:{stateDetail.descripcion}</p>
      </div>
    </div>
  );
};

export default Detail;
