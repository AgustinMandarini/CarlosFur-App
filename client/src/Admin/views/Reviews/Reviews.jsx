import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, deleteReview } from "../../../redux/actions";
import Table from "react-bootstrap/Table";
import axios from "axios";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import style from "./Reviews.module.css";
import StartRating from "../../../views/Reviews/StartRating";
import { IconTrash } from "@tabler/icons-react";

const apiUrl = process.env.REACT_APP_API_URL;

const Reviews = () => {
  const dispatch = useDispatch();
  const totalReviews = useSelector((state) => state.totalReviews);

  useEffect(() => {
    dispatch(getReviews());
  }, []);

  const handleDeleteReview = (id) => {
    dispatch(deleteReview(id));
    dispatch(getReviews());
  };

  return (
    <div className={style.cntnUsers}>
      <div className={style.cntnTittle}>
        <h1>Reviews</h1>
      </div>
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
          {totalReviews &&
            totalReviews.map((review) => (
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
    </div>
  );
};

export default Reviews;
