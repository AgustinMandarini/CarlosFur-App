import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ButtonGoogle } from "../BotonGoogle/BotonGoogle";
import Form from "react-bootstrap/Form";

import style from "./LoginForm.module.css";
import validation from "./validation";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    e_mail: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    e_mail: "",
    password: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    setErrors(validation({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const validationErrors = validation(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // dispatch(postProduct(form));
    }
  };

  return (
    <div className={style.cntnForm}>
      <p className={style.tittle}>Iniciar Sesion</p>
      <Form className={style.formConteiner} onSubmit={submitHandler}>
        <Form.Group className={style.formGroup}>
          <Form.Label className={style.label}>Email: </Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="email"
              value={form.e_mail}
              onChange={changeHandler}
              name="e_mail"
              className={style.input}
            />

            <Form.Text className={style.error}>
              {errors.e_mail ? <span>{errors.e_mail}</span> : ""}
            </Form.Text>
          </div>
        </Form.Group>
        <Form.Group className={style.formGroup}>
          <Form.Label className={style.label}>Contraseña: </Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="password"
              value={form.password}
              onChange={changeHandler}
              name="password"
              className={style.input}
            />

            <Form.Text className={style.error}>
              {errors.password ? <span>{errors.password}</span> : ""}
            </Form.Text>
          </div>
        </Form.Group>
        <Form.Group className={style.formGroup}>
          <Form.Label className={style.smallLabel}>
            <ButtonGoogle />
          </Form.Label>
        </Form.Group>

        <Form.Group className={style.formGroup}>
          <Form.Label className={style.smallLabel}>
            No tienes una cuenta? Registrate <Link to="/register">aquí</Link>
          </Form.Label>
        </Form.Group>
        <button
          disabled={Object.keys(errors).length > 0}
          className={style.botonSubmit}
        >
          Enviar
        </button>
      </Form>
    </div>
  );
};

export default LoginForm;
