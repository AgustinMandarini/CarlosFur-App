import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ButtonGoogle } from "../BotonGoogle/BotonGoogle";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import style from "./RegisterForm.module.css";
import validation from "./validation";

const RegisterForm = () => {
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    user_name: "",
    e_mail: "",
    password: "",
    confPassword: "",
  });
  const [errors, setErrors] = useState({
    user_name: "",
    e_mail: "",
    password: "",
    confPassword: "",
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

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
        connection: "google-oauth2",
      },
    });
  };

  return (
    <div className={style.cntnForm}>
      <p className={style.tittle}>Crea tu cuenta</p>
      <Form className={style.formConteiner} onSubmit={submitHandler}>
        <Form.Group className={style.formGroup} controlId="formBasicEmail">
          <Form.Label className={style.label}>Nombre de usuario: </Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="text"
              value={form.user_name}
              onChange={changeHandler}
              name="user_name"
              className={style.input}
            />
            <Form.Text className={style.error}>
              {errors.user_name ? <span>{errors.user_name}</span> : ""}
            </Form.Text>
          </div>
        </Form.Group>

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
          <Form.Label className={style.label}>Confirme contraseña:</Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="password"
              value={form.confPassword}
              onChange={changeHandler}
              name="confPassword"
              className={style.input}
            />
            <Form.Text className={style.error}>
              {errors.confPassword ? <span>{errors.confPassword}</span> : ""}
            </Form.Text>
          </div>
        </Form.Group>
        <Form.Group className={style.formGroup}>
          <Form.Label className={style.smallLabel}>
            Ya eres un usuario registrado? <Link to="/logIn">LogIn</Link>
          </Form.Label>
        </Form.Group>
        <Form.Group className={style.formGroup}>
          <Form.Label className={style.mediumLabel}>
            O ingresa a traves de Google
          </Form.Label>
        </Form.Group>
        <Form.Label className={style.smallLabel}>
          <ButtonGoogle />
        </Form.Label>
        <Button
          disabled={Object.keys(errors).length > 0}
          className={style.botonSubmit}
        >
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
