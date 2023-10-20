import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import styles from "./Reset.module.css";
import validation from "./validation";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();
  const loggedUser = useSelector((state) => state.loggedUser);

  const [form, setForm] = useState({
    e_mail: "",
  });
  const [errors, setErrors] = useState({
    e_mail: "",
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>¿Olvidaste tu contraseña?</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          {/* E_mail input */}
          <div className={styles.inputContainer}>
            <p className={`${styles.text}`}>
              Introduce abajo tu correo electrónico con el que te registraste.
              Te enviaremos los detalles para restablecer la contraseña de tu
              cuenta.{" "}
            </p>
            <div className={styles.data}>
              <input
                type="text"
                placeholder="Email..."
                className={`${styles.input} ${errors.e_mail && styles.error}`}
                name="e_mail"
                value={form.e_mail}
                onChange={changeHandler}
                required
              />
            </div>
          </div>
          {errors.e_mail && <p className={styles.errorText}>{errors.e_mail}</p>}

          {/* Buttons */}
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">
              Restablecer contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
