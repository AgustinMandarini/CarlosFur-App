import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrdersAdmin } from "./../../../redux/actions";
import style from "./Ventas.module.css";
import PaymentType from "./PaymentType";
import Form from "react-bootstrap/Form";

const Ordenes = () => {
  const [cart, setCart] = useState(null);
  const orders = useSelector((state) => state.ordersAdmin);
  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAdmin());
  }, [dispatch]);

  // const filteredOrders = selectedPaymentTypeId.name
  //   ? orders.filter((order) => order.paymentTypeId && order.paymentTypeId.name === selectedPaymentTypeId)
  //   : orders;

  return (
    <div className={style.cntnGral}>
      <div className={style.container}>
        <div className={style.divSelect}>
          <Form.Select
            value={selectedPaymentTypeId}
            onChange={(e) => setSelectedPaymentTypeId(e.target.value)}
            className={style.select}
          >
            <option value="">Formas de pago:</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta de debito">Tarjeta de débito</option>
          </Form.Select>
        </div>
        <div className={style.divSelect}>
          <Form.Select className={style.select}>
            <option value="">Ordenar por:</option>
            <option value="asc">Productos más vendidos</option>
            <option value="desc">Productos menos vendidos</option>
          </Form.Select>
        </div>
      </div>
      <div className={style.cntnProductos}>
        <div className={style.cntnTittle}>
          <h1>Ventas registradas</h1>
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
            {Array.isArray(orders) &&
              orders.map((order) => (
                <tr key={order.id} className={style.td}>
                  <td className={style.cntnTr}>{order.id}</td>
                  <td className={style.cntnTr}>{order.mercadoPagoId}</td>
                  <td className={style.cntnTr}>
                    {order.cartData?.total_amount}
                  </td>
                  <td className={style.cntnTr}>{order.saleDate}</td>
                  <td>
                    <Button variant="secondary">
                      <Link
                        to={`/admin/detalle/${order.cartId}`}
                        className={style.link}
                      >
                        Ver detalle
                      </Link>
                    </Button>
                  </td>
                  <PaymentType paymentTypeId={order.paymentTypeId} />
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Ordenes;
