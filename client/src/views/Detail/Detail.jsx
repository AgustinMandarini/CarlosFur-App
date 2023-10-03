import { React, useEffect } from "react";
import style from "./Detail.module.css";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import imagenDefault from "./../../imagenes/default.png";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const stateDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  console.log(stateDetail);
  return (
    <div className={style.cntnDetail}>
      <Button
        className={style.goBackLink}
        variant="dark"
        href="/home"
        size="sm"
      >
        Volver
      </Button>

      <div className={style.cntnCardDetail}>
        <div className={style.imgContainer}>
          {stateDetail.imagePath ? (
            <>
              <img
                src={stateDetail.imagePath}
                className={style.imgDetail}
                alt="image"
              />
            </>
          ) : (
            <img src={imagenDefault} className={style.imgDetail} alt="image" />
          )}
          <p className={style.p}>{stateDetail.name}</p>
          <p className={style.p}>${stateDetail.price}</p>
        </div>
        <div className={style.texto}>
          <p className={style.p}>{stateDetail.description}</p>
          <p className={style.p}>Altura: {stateDetail.height} </p>
          <p className={style.p}>Profundidad: {stateDetail.depth} </p>
          <p className={style.p}>Ancho: {stateDetail.width}</p>
          <p className={style.p}>Peso: {stateDetail.weight}</p>
          <p className={style.p}>Color: {stateDetail.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
