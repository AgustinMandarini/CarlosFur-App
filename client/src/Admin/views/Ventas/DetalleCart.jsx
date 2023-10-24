import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./DetalleCart.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";

const DetalleCart = () => {
  const { cartId } = useParams();
  const [cart, setCart] = useState({});

  useEffect(() => {
      axios.get(`http://localhost:3001/cart/${cartId}`)
      .then(({ data }) => {
        //   console.log("AAAA", data)
          if (data.id) {
              setCart(data);
        } else {
          window.alert("No hay carrito con ese ID");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del carrito:", error);
      });
  }, [cartId]); 

  return (
    <div className={style.cntnForm}>
    <h1>Detalles del Carrito</h1>
    <Form className={style.formConteiner}>
    {cart.id ? (
      <div>
        
          <h3>Productos comprados: </h3>
      {cart.products.map((product, index) => (
          <li key={index}>
          <strong>Nombre del Producto:</strong> {product.name}<br />
          <strong>Cantidad:</strong> {product.product_quantity}<br />
          <strong>ID del Producto:</strong> {product.productId}
        </li> ))} <br />
            
            <h4>ID del Carrito: </h4>{cart.id} <br />
            <h4>Total Amount: </h4>{cart.total_amount} <br />
            <h4>User Name: </h4>{cart.user_name} <br />
            <h4>User Id: </h4>{cart.user_id} <br />
         
        <Button variant="secondary">{" "}
         <Link to="/admin/ventas" className={style.link}>
            Volver
         </Link>
        </Button>{""}
    
    </div>

    ) : (
      <p>Cargando detalles del carrito...</p>
    )}

    </Form>
  </div>
  );
};

export default DetalleCart;
