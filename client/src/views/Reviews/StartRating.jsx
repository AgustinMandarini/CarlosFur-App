import React from "react";
import { FaStar } from "react-icons/fa";
import style from "./StartRating.module.css";

const StarRating = ({ rating }) => {
  const stars = Array(5).fill(0);

  return (
    <div className={style.cntnStars}>
      {stars.map((_, index) => (
        <FaStar
          key={index}
          size={10}
          style={{
            color: index < rating ? "#FFBA5A" : "#a9a9a9",
          }}
          className={style.cntnStars}
        />
      ))}
    </div>
  );
};

export default StarRating;
