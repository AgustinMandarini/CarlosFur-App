import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import style from "./Productos.module.css";
import {putProduct} from "./../../../redux/actions"
const Productos = () => {

  const productos = useSelector((state) => state.muebles);
  const dispatch = useDispatch();

  const handleDeleteProduct = (event) => {
    alert("esto funciona Correctamente")
    const id = event.target.value
    console.log(id);
    // dispatch(putProduct(id));
  }

  const handlePutProduct = (event) => {
    alert("Esto funciona Correctamente")
  
  }
  return ( <div>

  <Table striped bordered hover>
    <thead>
      <tr>
        <th>  <h1>Productos Cargados</h1></th>
      </tr>
    </thead>
  </Table>
  <Table striped bordered hover>
    <tbody>
      {productos.map((producto) => (
        <tr key={producto.id}>
        <td>
        <img src={producto.imagen} className={style.img}alt={producto.name} />
      </td>
          <td>{producto.name}</td>
          <td>
          <Button variant="outline-secondary" value={producto.id} onClick={handlePutProduct}>Editar</Button>{' '}
          </td>
          <td>
          <Button variant="outline-danger" value={producto.id} onClick={handleDeleteProduct}>Eliminar</Button>{' '}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>
)
};

export default Productos;
