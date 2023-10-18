import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import {postProductType } from "./../../../redux/actions";
import style from "./CrearTipoProducto.module.css";
import validation from "./validation";

const CrearTipoProducto = () => {

  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    setErrors(validation({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const validationErrors = validation(form);
    if (Object.keys(validationErrors).length === 0) {
      // Los datos son válidos, puedes enviar el formulario
      dispatch(postProductType(form));
    } else {
      // Mostrar errores en los campos
      setErrors(validationErrors);
    }
  };


  return (
    <div className={style.cntnForm}>
      <p className={style.tittle}>Nuevo Tipo de Producto:</p>
      <Form className={style.formConteiner} onSubmit={submitHandler}>
        <Form.Group className={style.formGroup} controlId="formBasicEmail">
          <Form.Label className={style.label}>Nombre del Tipo de Producto: </Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="text"
              value={form.name}
              onChange={changeHandler}
              name="name"
              className={style.input}
            />
            <Form.Text className={style.error}>
              {errors.name && formSubmitted ? <span>{errors.name}</span> : ""}{" "}
            </Form.Text>
          </div>
        </Form.Group>

        {/*DESCRIPCION*/}
        <Form.Group className={style.formGroup} controlId="formBasicEmail">
          <Form.Label className={style.label}>Descripcion: </Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="text"
              value={form.description}
              onChange={changeHandler}
              name="description"
              className={style.input}
            />
            <Form.Text className={style.error}>
              {errors.description && formSubmitted ? <span>{errors.description}</span> : ""}{" "}
            </Form.Text>
          </div>
        </Form.Group>

       
        {Object.values(errors).every((error) => error === "") ? (
          <button type="submit" className={style.botonSubmit}>
            Enviar
          </button>
        ) : (
          <button type="submit" className={style.botonSubmitOff}>
            Enviar
          </button>
        )}
      </Form>
    </div>
  );
};

export default CrearTipoProducto;
