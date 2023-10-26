import React, { useState, useEffect } from "react";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

const PaymentType = ({ paymentTypeId }) => {
  const [paymentType, setPaymentType] = useState(null);

  useEffect(() => {
    const fetchPaymentType = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/PaymentType/${paymentTypeId}`
        );
        setPaymentType(response.data);
      } catch (error) {
        console.error("Error al obtener el tipo de pago:", error);
      }
    };

    fetchPaymentType();
  }, [paymentTypeId]);

  return (
    <td>
      {paymentType ? (
        <p>{paymentType.name}</p>
      ) : (
        <p>Cargando información del tipo de pago...</p>
      )}
    </td>
  );
};

export default PaymentType;
