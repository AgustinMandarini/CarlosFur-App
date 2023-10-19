import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Cambiado a "react-router-dom"
import {
  deleteProduct,
  putEnableDisable,
  getProductsAdmin,
} from "./../../../redux/actions"; // Agregada la importación de "getProductsAdmin"
import style from "./Productos.module.css";

const Productos = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [reloadProducts, setReloadProducts] = useState(false);

  const productos = useSelector((state) => state.productsAdmin);
  const dispatch = useDispatch();

  const handleDeleteProduct = (event) => {
    const id = event.target.value;
    setProductIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productIdToDelete !== null) {
      dispatch(deleteProduct(productIdToDelete));
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setProductIdToDelete(null);
    setShowDeleteModal(false);
  };

  const changeProductEnabled = (id) => {
    dispatch(putEnableDisable(id));
  };

  useEffect(() => {
    dispatch(getProductsAdmin());
  }, [productIdToDelete]);

  return (
    <div className={style.cntnProductos}>
      <div className={style.cntnTable}>
        <Table striped bordered hover>
          <thead>
            <tr className={style.tittle}>
              <th>
                <h1>Productos Cargados</h1>
              </th>
            </tr>
          </thead>
        </Table>
        <Table striped bordered hover className={style.td}>
          <tbody>
            {Array.isArray(productos) &&
              productos.map((producto) => (
                <tr key={producto.id} className={style.td}>
                  <td className={style.cntnTr}>
                    <Container>
                      <Row className={style.td}>
                        <Col xs={10} md={6} className={style.td}>
                          <Image
                            src={producto.imagen}
                            className={style.img}
                            thumbnail
                          />
                        </Col>
                      </Row>
                    </Container>
                  </td>
                  <td className={style.cntnTr}>{producto.name}</td>

                  <td className={style.cntnTr}>
                    <Link
                      to={`/admin/productos/editar/${producto.id}`}
                      className={style.link}
                    >
                      Editar
                    </Link>
                  </td>
                  <td className={style.cntnTr}>
                    <BootstrapSwitchButton
                      onstyle="success"
                      height={15}
                      width={60}
                      value={producto.id}
                      onChange={() => changeProductEnabled(producto.id)}
                      checked={producto.enabled_product} // Cambiado a "producto.enabled_product"
                    />
                  </td>
                  <td className={style.cntnTr}>
                    <Button
                      className={style.butttonDelete}
                      variant="outline-danger"
                      value={producto.id}
                      onClick={handleDeleteProduct}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Modal show={showDeleteModal} onHide={cancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Seguro que deseas eliminar este producto?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Productos;
