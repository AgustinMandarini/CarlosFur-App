import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrdersAdmin, getCarts } from "./../../../redux/actions";
import style from "./Ventas.module.css";
import PaymentType from "./PaymentType";

const Ordenes = () => {
  const orders = useSelector((state) => state.ordersAdmin);
  const carts = useSelector((state) => state.cartsAdmin);
  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState(""); 
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  
  useEffect(() => {
    dispatch(getOrdersAdmin());
  }, []);
  useEffect(() => {
    dispatch(getCarts());
  }, []);
  
  // console.log("DELLLLFI", carts)
    
  const filteredOrders = selectedPaymentTypeId
  ? orders.filter((order) => {
    
    return order.paymentTypeId === selectedPaymentTypeId;
  })
  : orders;
  
  
  return (
    
    <div>
          <span>
          <select
  value={selectedPaymentTypeId}
  onChange={(e) => setSelectedPaymentTypeId(e.target.value)}
>
  <option value="">Formas de pago:</option>
  <option value="Efectivo">Efectivo</option>
  <option value="Tarjeta de débito">Tarjeta de débito</option>
</select>

          </span>
          
          <span>
          <select>
            <option value="" >Ordenar por:</option>
            <option value="asc">Productos más vendidos</option>
            <option value="desc">Productos menos vendidos</option>
          </select>
          </span>

          
          <div className={style.cntnUsers}> </div>
            
      <div className={style.cntnTittle}>
      <h1>Registro de ventas</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.cntnTh}>Orden</th>
            <th className={style.cntnTh}>Comprobante de Pago</th>
            <th className={style.cntnTh}>Importe</th>
            <th className={style.cntnTh}>Fecha de venta</th>
            <th className={style.cntnTh}>Carrito Comprado</th>
            <th className={style.cntnTh}>Forma de pago</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(orders) && Array.isArray(carts) &&
            filteredOrders.map((order) => {
              // console.log("hoolis", filteredOrders)
              const cart = carts.find((cart) => cart.id === order.cartId);

              return (
                <tr key={order.id} className={style.td}>
                  <td className={style.cntnTr}>{order.id}</td>
                  <td className={style.cntnTr}>{order.mercadoPagoId}</td>
                  <td className={style.cntnTr}>
                    {cart ? cart.total_amount : 'N/A'}
                  </td>
                  <td className={style.cntnTr}>{order.saleDate}</td>
                  <td>

                    <Button variant="primary">
                      <Link to={`/user/admin/${loggedUser.id}/detalle/${order.cartId}`} className={style.link}>
                        <strong>Ver detalle</strong>
                      </Link>
                    </Button>

                  </td>
                  <PaymentType paymentTypeId={order.paymentTypeId} />
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Ordenes;
