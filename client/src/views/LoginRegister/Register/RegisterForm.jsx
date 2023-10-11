import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../../redux/actions";
import googleLogo from "../../../imagenes/logoGoogle.png";
import styles from "./RegisterForm.module.css";
import validation from "./validation";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const RegisterForm = () => {
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleLocalSignUp = async () => {
    const newUser = {
      user_name: form.user_name,
      e_mail: form.e_mail,
      password: form.password,
      lastName: form.lastName,
    };
    try {
      const response = await axios.get(`${apiUrl}/user?e_mail=${form.e_mail}`);
      if (response.status === 200) {
        console.log(response.status);
        const data = response.data;

        if (data.length && data[0].e_mail === form.e_mail) {
          alert("Ya existe un usuario con ese nombre o email");
        }
      }
    } catch {
      // Esta funcion es casi la misma que esta en login. Luego de iniciar sesion, loguea
      // generando un token desde la ruta /get
      try {
        const response = await axios.post(`${apiUrl}/user`, newUser);

        if (response.status === 201) {
          alert("Usuario creado exitosamente!");
          try {
            const response = await axios.get(
              `${apiUrl}/user?e_mail=${form.e_mail}`
            );
            const data = response.data;
            const userInfoWithToken = {
              ...newUser,
              accessToken: response.data.accessToken,
            };

            if (
              Object.keys(data).length > 0 &&
              data.user.e_mail === form.e_mail
            ) {
              // Si el usuario está creado, lo tiene que logear
              dispatch(login(userInfoWithToken));
              history.push("/home");
            }
          } catch (error) {
            alert("Error al loguear el nuevo usuario");
          }
        }
      } catch (error) {
        alert("Errors desde front: " + error);
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const validationErrors = validation(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      handleLocalSignUp();
    }
  };

  return (
    <>
      <div className={styles.containerReg}>
        <div className={styles.containerData}>
          <h2>Crear una cuenta</h2>
          <form onSubmit={submitHandler} noValidate>
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
