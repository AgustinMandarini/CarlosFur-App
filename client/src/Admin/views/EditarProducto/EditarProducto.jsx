import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getDetail } from "../../../redux/actions";
import style from "./EditarProducto.module.css";

const FormPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
   dispatch(getDetail(id));
      }, []);
      const stateDetail = useSelector((state) => state.detail);
console.log(stateDetail);
  return (
    <div className={style.cntnForm}>
      <p className={style.tittle}>Editar Producto</p>
      <Form className={style.formConteiner}>
        <Form.Group className={style.formGroup} controlId="formBasicEmail">
          <Form.Label className={style.label}>Nombre: </Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="text"
            //   value={form.name}
              name="name"
              className={style.input}
            />
            <Form.Text className={style.error}>
            </Form.Text>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FormPage;
