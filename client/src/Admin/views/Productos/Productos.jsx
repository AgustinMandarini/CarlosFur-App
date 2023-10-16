import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import style from './Productos.module.css';
import { putProduct, deleteProduct } from './../../../redux/actions';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Productos = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const productos = useSelector((state) => state.muebles);
  const dispatch = useDispatch();

  const handleDeleteProduct = (event) => {
    const id = event.target.value;
    setProductIdToDelete(id);
    setShowDeleteModal(true);
  }

  const confirmDelete = () => {
    if (productIdToDelete !== null) {
      dispatch(deleteProduct(productIdToDelete));
      setShowDeleteModal(false);
    }
  }

  const cancelDelete = () => {
    setProductIdToDelete(null);
    setShowDeleteModal(false);
  }


  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <h1>Productos Cargados</h1>
            </th>
          </tr>
        </thead>
      </Table>
      <Table striped bordered hover>
        <tbody>
          {productos &&
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <img src={producto.imagen} className={style.img} alt={producto.name} />
                </td>
                <td>{producto.name}</td>
                <td>
                  <Button variant="outline-secondary" >
                   <Link  to={`/admin/productos/editar/${producto.id}`}>Editar</Link>
                  </Button>{' '}
                </td>
                <td>
                  <Button variant="outline-danger" value={producto.id} onClick={handleDeleteProduct}>
                    Eliminar
                  </Button>{' '}
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
  );
};

export default Productos;
