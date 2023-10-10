import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import style from "./Paginacion.module.css";

const Paginacion = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
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
    <div className={style.container}>
      <Pagination>
        {currentPage === 1 ? (
          <Pagination.Prev
            className={style.botonInactivo}
            alt="atras"
            href="#"
          />
        ) : (
          <Pagination.Prev
            className={style.botonActivo}
            alt="atras"
            onClick={() => paginate(currentPage - 1)}
            href="#"
          />
        )}

        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            onClick={() => handlePageClick(number)}
            active={number === currentPage}
            className={style.numberPaginado}
          >
            {number}
          </Pagination.Item>
        ))}
        {currentPage === pageNumbers.length ? (
          <Pagination.Next
            clas
            sName={style.botonInactivo}
            alt="atras"
            href="#"
          />
        ) : (
          <Pagination.Next
            className={style.botonActivo}
            alt="atras"
            onClick={() => paginate(currentPage + 1)}
            href="#"
          />
        )}
      </Pagination>
    </div>
  );
};

export default Paginacion;
