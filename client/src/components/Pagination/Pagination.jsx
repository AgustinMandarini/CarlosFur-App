import React, { useState } from "react";
import style from "./Pagination.module.css";
import { useEffect } from "react";
import atras from "./../../imagenes/atras.png"
import siguiente from "./../../imagenes/siguiente.png"
//ss
const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  const [selectedPage, setSelectedPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
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
      <ul className={style.container}>
      <div className={style.containerBotones}>
          {/* BOTON ATRAS */}
          {currentPage === 1 ? (
            <img
              src={atras}
              className={style.botonInactivo}
              alt="atras"
            />
          ) : (
            <img
              src={atras}
              className={style.botonActivo}
              alt="atras"
              onClick={() => paginate(currentPage - 1)}
              href="#"
            />
          )}
          {/* BOTON SIGUIENTE */}
          {currentPage === pageNumbers.length ? (
            <img
              src={siguiente}
              className={style.botonInactivo}
              alt="atras"
            />
          ) : (
            <img
              src={siguiente}
              className={style.botonActivo}
              alt="atras"
              onClick={() => paginate(currentPage + 1)}
              href="#"
            />
          )}
        </div>
        <div className={style.pagination}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={number === currentPage ? style.active : ""}
          >
            {number}
          </button>
        ))}
        </div>
      </ul>
    </nav>
  );
};

export default Pagination;
