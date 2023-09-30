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
  console.log(stateDetail);
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className={style.cntnDetail}>
      <Link to="/home" className={style.goBackLink}>
        Volver
      </Link>
      <div className={style.cntnCardDetail}>
        <div className={style.cntnP}>
          <p className={style.p}>Nombre: {stateDetail.name}</p>
          <p className={style.p}>Precio: {stateDetail.price}</p>
          <p className={style.p}>Altura: {stateDetail.height} </p>
          <p className={style.p}>Profundidad: {stateDetail.depth} </p>
          <p className={style.p}>Ancho: {stateDetail.width}</p>
          <p className={style.p}>Peso: {stateDetail.weight}</p>
          <p className={style.p}>Color: {stateDetail.color}</p>
          <p className={style.p}>Descripcion: {stateDetail.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
