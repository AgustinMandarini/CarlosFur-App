import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import googleLogo from "../../imagenes/logoGoogle.png";
import { validate } from "./Utils/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setErrors(validate({ ...errors, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Puedes agregar lógica adicional aquí, por ejemplo, enviar datos al servidor.
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Inicio de sesión</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Email input */}
          <div className={styles.inputContainer}>
            <div className={styles.data}>
              <input
                type="text"
                placeholder="Email..."
                className={`${styles.input} ${errors.email && styles.error}`}
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <span className={styles.label}>E-mail</span>
          </div>
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}

          {/* Password input */}
          <div className={`${styles.inputContainer} ${styles.mt2}`}>
            <div className={styles.data}>
              <input
                type="password"
                placeholder="Contraseña..."
                className={`${styles.input} ${errors.password && styles.error}`}
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
              <span className={styles.label}>Contraseña</span>
            </div>
          </div>
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}

          {/* Buttons */}
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">
              Iniciar sesión
            </button>
            {/* Botón "Acceder con Google" */}
            <button className={styles.googleButton} type="button">
              <img
                src={googleLogo}  // Reemplaza esto con la ruta correcta
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

export default Login;
