import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deleteProduct, putEnableDisable } from "./../../../redux/actions";
import style from "./Productos.module.css";
import { IconTrash } from "@tabler/icons-react";

const Productos = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const productos = useSelector((state) => state.muebles);
  const dispatch = useDispatch();
  console.log(productos);
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
    // Llama a la acción putEnableDisable con el id del producto
    //const id = event.target.value;
    dispatch(putEnableDisable(id));
  };

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
                  <td>
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
                  <td>{producto.name}</td>

                  <td>
                    <Link
                      to={`/admin/productos/editar/${producto.id}`}
                      className={style.link}
                    >
                      Editar
                    </Link>
                  </td>
                  <td>
                    <BootstrapSwitchButton
                      onstyle="success"
                      value={producto.id}
                      onChange={() => changeProductEnabled(producto.id)}
                      checked={productos.enabled_product}
                      className={style.button}
                    />
                  </td>
                  <td>
                    <button
                      className={style.buttonDelete}
                      value={producto.id}
                      onClick={handleDeleteProduct}
                    >
                      <IconTrash color="red" stroke="1.3" />
                    </button>
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
