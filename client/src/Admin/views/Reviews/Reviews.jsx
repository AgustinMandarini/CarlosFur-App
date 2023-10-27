import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, deleteReview } from "../../../redux/actions";
import Table from "react-bootstrap/Table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import style from "./Reviews.module.css";
import StartRating from "../../../views/Reviews/StartRating";
import { IconTrash } from "@tabler/icons-react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Reviews = () => {
  const dispatch = useDispatch();
  const totalReviews = useSelector((state) => state.totalReviews);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(getReviews());
  }, []);

  const handleDeleteReview = (id) => {
    setReviewIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (reviewIdToDelete) {
      dispatch(deleteReview(reviewIdToDelete)).then(() => {
        dispatch(getReviews());
        setShowDeleteModal(false);
      });
    }
  };

  const cancelDelete = () => {
    setReviewIdToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className={style.cntnUsers}>
      <div className={style.cntnTittle}>
        <h1>Reviews</h1>
      </div>
      {totalReviews && totalReviews.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={style.cntnTh}>Review</th>
              <th className={style.cntnTh}>Fecha</th>
              <th className={style.cntnTh}>Rating</th>
              <th className={style.cntnTh}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {totalReviews.map((review) => (
              <tr key={review.id}>
                <td className={style.cntnTr}>{review.description}</td>
                <td className={style.cntnTr}>{review.reviewDate}</td>
                <td className={style.cntnTr}>
                  <StartRating
                    style={{ margin: "0px" }}
                    rating={review.rating}
                  />
                </td>
                <td className={style.cntnTr}>
                  <div onClick={() => handleDeleteReview(review.id)}>
                    <IconTrash
                      stroke="1.3px"
                      size="20px"
                      className={style.icon}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Aún no tienes ninguna revisión.</p>
      )}

      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header className={style.headerModal}>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que deseas eliminar esta revisión?</Modal.Body>
        <Modal.Footer className={style.footerModal}>
          <Button className={style.buttonModal} onClick={cancelDelete}>
            Cancelar
          </Button>
          <Button className={style.buttonModal} onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reviews;
