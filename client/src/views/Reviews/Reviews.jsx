import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Reviews.module.css";
import { createReview, getReviewByProductId } from "../../redux/actions";
import Button from "react-bootstrap/Button";
import { FaStar } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import StarRating from "./StartRating";

import { useHistory } from "react-router-dom";

const Reviews = ({ id }) => {
  const [values, setValues] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [show, setShow] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false); // Nueva prop para el segundo modal
  const [hoverValue, setHoverValue] = useState(undefined);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.loggedUser);
  const reviews = useSelector((state) => state.reviews);
  const history = useHistory();

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleAcept = () => {
    setShow(false);
  };

  const handleSecondModalClose = () => {
    setShowSecondModal(false);
  };

  const handleOnChange = (e) => {
    setValues(e.target.value);
  };
  const stars = Array(5).fill(0);

  const handleSubmit = async () => {
    if (currentValue === 0) {
      setShowSecondModal(true);
      return;
    }
    if (!userId) {
      history.push("/logIn");

      return;
    }

    try {
      const reviewData = {
        productId: id,
        userId: userId.id,
        description: values,
        rating: currentValue,
        reviewDate: new Date().toLocaleDateString(undefined, options),
      };

      await dispatch(createReview(reviewData));
      dispatch(getReviewByProductId(id));

      setValues("");
      setCurrentValue(0);
      handleShow();
      setTimeout(handleClose, 4000);
    } catch (error) {
      console.error("Error al enviar la reseña:", error);

      setShow(false);
      setShowSecondModal(false);
    }
  };
  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const options = { year: "numeric", month: "long", day: "numeric" };

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  useEffect(() => {
    dispatch(getReviewByProductId(id));
  }, [dispatch]);

  return (
    <div className={style.cntnReview}>
      <p className={style.tittle}>Califica este producto</p>
      <div className={style.cntnIcons}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={18}
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={() => handleMouseLeave}
            />
          );
        })}
      </div>
      <div>
        <div>
          <textarea
            className={style.textarea}
            onChange={handleOnChange}
            type="text"
            value={values}
            placeholder="Deja un comentario..."
          />
        </div>
        <button onClick={() => handleSubmit()} className={style.btnEnviar}>
          Enviar
        </button>
      </div>
      <div>
        {reviews && reviews.length > 0 && <p>Reviews</p>}

        {reviews && reviews.reviews
          ? reviews.reviews.map((review, index) => (
              <div key={index} className={style.reviewItem}>
                <div className={style.reviewItemInner}>
                  <p className={style.p}> {review.user.user_name}</p>
                  <StarRating rating={review.rating} />
                </div>
                <div className={style.reviewItemInner}>
                  <p className={style.p}>{review.reviewDate}</p>
                  <p className={style.p}>{review.description}</p>
                </div>
              </div>
            ))
          : "Cargando reseñas..."}
      </div>

      <Modal show={show}>
        <Modal.Header className={style.headerModal}>
          <Modal.Title>Recibimos tu calificación!</Modal.Title>
        </Modal.Header>
        <Modal.Footer className={style.footerModal}>
          <p>
            Gracias <strong>{userId && userId.user_name}</strong>, tendremos en
            cuenta tu opinión!
          </p>
          <Button className={style.buttonModal} onClick={handleAcept}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

      {showSecondModal && (
        <Modal show={showSecondModal} onHide={handleSecondModalClose}>
          <Modal.Header className={style.headerModal}>
            <Modal.Title className={style.modalTittle}>
              Por favor, selecciona una calificación antes de enviar la reseña
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className={style.footerModal}>
            <Button
              className={style.buttonModal}
              onClick={handleSecondModalClose}
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Reviews;
