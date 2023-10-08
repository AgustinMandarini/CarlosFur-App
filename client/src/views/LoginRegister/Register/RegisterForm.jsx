import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import googleLogo from "../../../imagenes/logoGoogle.png";
import styles from "./RegisterForm.module.css";
import validation from "./validation";

const RegisterForm = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
      authorizationParams: {
        screen_hint: "signup",
        connection: "google-oauth2",
      },
    });
  };

  const handleLocalSignUp = () => {
    
      if (Object.keys(errors)) {
        try {
          const response = await axios.get(`${apiUrl}/user?email=${user.email}`);
          const data = response.data;
  
          if (data.length && data[0].e_mail === user.email) {
            // Si el usuario ya está creado, lo tiene que logear
            console.log("Usuario existente!!");
            dispatch(getUser(user.email));
          } else {
            // Si no está creado, crea uno nuevo
            console.log("Usuario nuevo. Creando usuario...");
            const newUser = { user_name: user.name, e_mail: user.email };
            dispatch(postUser(newUser));
          }
        } catch (error) {
          console.log(`${error}`);
        }
  
    };
  }

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

  return (
    <>
      <div className={styles.containerReg}>
        <div className={styles.containerData}>
          <h2>Crear una cuenta</h2>
          <form onSubmit={submitHandler}>
            <div className={styles.inputContainer}>
              <div className={styles.inputSection}>
                <div className={`${styles.cInput} ${styles["c-input"]}`}>
                  <div className={styles.data}>
                    <input
                      type="text"
                      value={form.user_name}
                      name="user_name"
                      onChange={changeHandler}
                      className={styles.inputField}
                      required
                    />
                    {errors.user_name && (
                      <p className={styles.errorText}>{errors.user_name}</p>
                    )}
                    <span className={styles.label}>Nombre</span>
                  </div>
                </div>
                <div
                  className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}
                >
                  <div className={styles.data}>
                    <input
                      type="text"
                      value={form.e_mail}
                      name="e_mail"
                      onChange={changeHandler}
                      className={styles.inputField}
                      required
                    />
                    {errors.e_mail && (
                      <p className={styles.errorText}>{errors.e_mail}</p>
                    )}
                    <span className={styles.label}>E-mail</span>
                  </div>
                </div>
                <div
                  className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}
                >
                  <div className={styles.data}>
                    <input
                      type="password"
                      value={form.password}
                      name="password"
                      onChange={changeHandler}
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
                      value={form.lastName}
                      name="lastName"
                      onChange={changeHandler}
                      className={styles.inputField}
                      required
                    />
                    {errors.lastName && (
                      <p className={styles.errorText}>{errors.lastName}</p>
                    )}
                    <span className={styles.label}>Apellido</span>
                  </div>
                </div>
                <div
                  className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}
                >
                  <div className={styles.data}>
                    <input
                      type="text"
                      value={form.whatsapp}
                      name="whatsapp"
                      onChange={changeHandler}
                      className={styles.inputField}
                      required
                    />
                    {errors.whatsapp && (
                      <p className={styles.errorText}>{errors.whatsapp}</p>
                    )}
                    <span className={styles.label}>Celular</span>
                  </div>
                </div>
                <div
                  className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}
                >
                  <div className={styles.data}>
                    <input
                      type="password"
                      value={form.confPassword}
                      name="confPassword"
                      onChange={changeHandler}
                      className={styles.inputField}
                      required
                    />
                    {errors.confPassword && (
                      <p className={styles.errorText}>{errors.confPassword}</p>
                    )}
                    <span className={styles.label}>Repetir Contraseña</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              {/* Botón "Acceder con Google" */}
              <button
                onClick={handleSignUp}
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
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={Object.keys(errors).length > 0}
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

export default RegisterForm;
