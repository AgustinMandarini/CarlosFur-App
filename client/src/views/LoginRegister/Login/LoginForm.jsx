import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import googleLogo from "../../../imagenes/logoGoogle.png";

import styles from "./LoginForm.module.css";
import validation from "./validation";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
      },
      appState: {
        returnTo: "/home",
      },
    });
  };

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
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Inicio de sesión</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          {/* E_mail input */}
          <div className={styles.inputContainer}>
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
            <span className={styles.label}>E-mail</span>
          </div>
          {errors.e_mail && <p className={styles.errorText}>{errors.e_mail}</p>}

          {/* Password input */}
          <div className={`${styles.inputContainer} ${styles.mt2}`}>
            <div className={styles.data}>
              <input
                type="password"
                placeholder="Contraseña..."
                className={`${styles.input} ${errors.password && styles.error}`}
                name="password"
                value={form.password}
                onChange={changeHandler}
                required
              />
              <span className={styles.label}>Contraseña</span>
            </div>
          </div>
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}

          {/* Buttons */}
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">
              Iniciar sesión
            </button>
            {/* Botón "Acceder con Google" */}
            <button
              onClick={handleLogin}
              className={styles.googleButton}
              type="button"
            >
              <img
                src={googleLogo} // Reemplaza esto con la ruta correcta
                alt="Google Logo"
                className={styles.googleLogo}
              />
              Acceder con Google
            </button>
            <span className={`${styles.text} ${styles.mt6}`}>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className={styles.link}>
                Regístrate
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
