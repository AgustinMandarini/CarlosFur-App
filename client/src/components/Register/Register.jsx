// import React from 'react';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   return (
//     <div>
//       <p>Formulario de Register</p>

//       <Link to="/home">
//         <button type="button">Home</button>
//       </Link>
//     </div>
//   );
// };

// export default Register;


// En el componente Register.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.css";
import { validate } from "./Utils/validation";

export const Register = () => {
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    whatsapp: "",
  });

  useEffect(() => {
    // Código de useEffect, si es necesario
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate(input));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(input);
    if (Object.keys(validationErrors).length === 0) {
      // No hay errores, puedes proceder con el envío del formulario
      // Coloca aquí el código para enviar los datos, por ejemplo, una llamada a la API
      console.log("Formulario válido, puedes enviar los datos:", input);
    } else {
      // Hay errores, actualiza el estado de errores
      setErrors(validationErrors);
    }
  }

  return (
    <>
      <div className={styles.containerReg}>
        <div className={styles.containerData}>
          <h2>Crear una cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <div className={styles.inputSection}>
                <div className={`${styles.cInput} ${styles["c-input"]}`}>
                  <div className={styles.data}>
                    <input
                      type="text"
                      value={input.name}
                      name="name"
                      onChange={(e) => handleChange(e)}
                      className={styles.inputField}
                      required
                    />
                    {errors.name && (
                      <p className={styles.errorText}>{errors.name}</p>
                    )}
                    <span className={styles.label}>Nombre</span>
                  </div>
                </div>
                <div className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}>
                  <div className={styles.data}>
                    <input
                      type="text"
                      value={input.email}
                      name="email"
                      onChange={(e) => handleChange(e)}
                      className={styles.inputField}
                      required
                    />
                    {errors.email && (
                      <p className={styles.errorText}>{errors.email}</p>
                    )}
                    <span className={styles.label}>E-mail</span>
                  </div>
                </div>
                <div className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}>
                  <div className={styles.data}>
                    <input
                      type="password"
                      value={input.password}
                      name="password"
                      onChange={(e) => handleChange(e)}
                      className={styles.inputField}
                      required
                    />
                    {errors.password && (
                      <p className={styles.errorText}>{errors.password}</p>
                    )}
                    <span className={styles.label}>Contraseña</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.inputSection} ${styles["w-2/5"]}`}>
                <div className={`${styles.cInput} ${styles["c-input"]}`}>
                  <div className={styles.data}>
                    <input
                      type="text"
                      value={input.lastName}
                      name="lastName"
                      onChange={(e) => handleChange(e)}
                      className={styles.inputField}
                      required
                    />
                    {errors.lastName && (
                      <p className={styles.errorText}>{errors.lastName}</p>
                    )}
                    <span className={styles.label}>Apellido</span>
                  </div>
                </div>
                <div className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}>
                  <div className={styles.data}>
                    <input
                      type="text"
                      value={input.whatsapp}
                      name="whatsapp"
                      onChange={(e) => handleChange(e)}
                      className={styles.inputField}
                      required
                    />
                    {errors.whatsapp && (
                      <p className={styles.errorText}>{errors.whatsapp}</p>
                    )}
                    <span className={styles.label}>Celular</span>
                  </div>
                </div>
                <div className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}>
                  <div className={styles.data}>
                    <input
                      type="password"
                      value={input.password2}
                      name="password2"
                      onChange={(e) => handleChange(e)}
                      className={styles.inputField}
                      required
                    />
                    {errors.password2 && (
                      <p className={styles.errorText}>{errors.password2}</p>
                    )}
                    <span className={styles.label}>Repetir Contraseña</span>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={styles.buttonContainer}>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={
                  errors.name ||
                  !input.name ||
                  !input.lastName ||
                  !input.email ||
                  !input.password ||
                  !input.password2 ||
                  !input.whatsapp ||
                  errors.lastName ||
                  errors.email ||
                  errors.password ||
                  errors.password2 ||
                  errors.whatsapp
                }
              >
                Registrarme
              </button>
            </div>
              <span className={styles.text}>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className={styles.link}>
                  Inicia sesión
                </Link>
              </span>
          </form>
        </div>
      </div>
    </>
  );
};
