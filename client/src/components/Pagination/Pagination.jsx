import React, { useState } from "react";
import style from "./Pagination.module.css";
import { useEffect } from "react";

const Pagination = ({ mueblesPerPage, totalMuebles, paginate }) => {
  const pageNumbers = [];
  const [selectedPage, setSelectedPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalMuebles / mueblesPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setSelectedPage(null);
  }, []);

  const handlePageClick = (number) => {
    setSelectedPage(number);
    paginate(number);
  };

  return (
    <nav>
      <ul className={style.pagination}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={number === selectedPage ? style.selected : ""}
          >
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
