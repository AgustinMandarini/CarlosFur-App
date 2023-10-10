import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../../redux/actions";
import googleLogo from "../../../imagenes/logoGoogle.png";
import styles from "./LoginForm.module.css";
import validation from "./validation";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();
  const loggedUser = useSelector((state) => state.loggedUser);

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

  // Maneja el login desde el formulario (login local de nuestro server)
  const handleLocalLogin = async () => {
    const userInfo = { e_mail: form.e_mail, password: form.password };
    if (form.e_mail && form.password) {
      try {
        // La ruta get genera valida si el usuario existe, y si existe genera un token de sesion
        const response = await axios.get(
          `${apiUrl}/user?e_mail=${form.e_mail}`
        );
        const data = response.data;
        const userInfoWithToken = {
          ...userInfo,
          accessToken: response.data.accessToken,
        };

        if (Object.keys(data).length > 0 && data.user.e_mail === form.e_mail) {
          // Si el usuario está creado, lo tiene que logear
          dispatch(login(userInfoWithToken));
        }
      } catch (error) {
        alert("El usuario no esta registrado o la contraseña es incorrecta");
      }
    }
  };

  // Este efecto se ejecutará cada vez que loggedUser cambie
  useEffect(() => {
    // Redirigir al usuario a la página de inicio después de iniciar sesión
    if (loggedUser) {
      // Realiza acciones adicionales aquí, por ejemplo, redireccionar
      // Puedes utilizar la navegación de React Router para redirigir al usuario
      // reemplace "/home" con la ruta correcta a la página de inicio
      history.push("/home");
    }
  }, [loggedUser]);

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
      handleLocalLogin();
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
