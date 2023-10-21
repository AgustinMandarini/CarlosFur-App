import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../../redux/actions";
import { toast } from "react-toastify";
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

  const mostrarNotificacionBienvenida = () => {
    toast.success("Iniciando Sesión", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
      },
      appState: {
        returnTo: `/home`,
      },
    });
    mostrarNotificacionBienvenida();
    if (loggedUser) console.log("Usuario google");
  };

  // Maneja el login desde el formulario (login local de nuestro server)
  const handleLocalLogin = async () => {
    const saveUserInfoToLocalStorage = (userId, cartId) => {
      const userLS = { userId, cartId };
      console.log(userLS);
      localStorage.setItem("user", JSON.stringify(userLS));
      const user = { userId, cartId };
      localStorage.setItem("user", JSON.stringify(user));
    };

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
          saveUserInfoToLocalStorage(data.user.id, data.user.cartId);
        }
      } catch (error) {
        toast.error("El usuario no se encuentra registrado", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };

  const fetchUserIdAndRedirect = async () => {
    if (loggedUser) {
      console.log("Usuario local" + loggedUser);
      try {
        history.push(`/user/profile/${loggedUser.id}`);
        // history.push(`/home`);
      } catch (error) {
        console.error("Error al obtener el ID del usuario:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserIdAndRedirect();
  }, [loggedUser, history]);

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
            <span className={styles.label}>E-mail</span>
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

          {/* Password input */}
          <div className={`${styles.inputContainer} ${styles.mt2}`}>
            <span className={styles.label}>Contraseña</span>
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
