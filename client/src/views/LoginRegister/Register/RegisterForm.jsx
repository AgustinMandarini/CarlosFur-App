import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { login } from "../../../redux/actions";
import googleLogo from "../../../imagenes/logoGoogle.png";
import styles from "./RegisterForm.module.css";
import validation from "./validation";
import axios from "axios";
import { useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const RegisterForm = () => {
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleSignUp = async () => {
    //funcion
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        connection: "google-oauth2",
      },
      appState: {
        returnTo: "/home",
      },
    });
  };

  const [form, setForm] = useState({
    user_name: "",
    e_mail: "",
    first_name: "",
    last_Name: "",
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
      first_name: form.user_name,
      last_name: form.last_Name,
      phone: form.phone,
    };
    try {
      const response = await axios.get(`${apiUrl}/user?e_mail=${form.e_mail}`);
      if (response.status === 200) {
        const data = response.data;
        if (Object.keys(data).length > 0 && data.user.e_mail === form.e_mail) {
          toast.error("Ya existe un usuario con ese nombre o email", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
      }
    } catch {
      // Esta funcion es casi la misma que esta en login. Luego de iniciar sesion, loguea
      // generando un token desde la ruta /get
      try {
        const response = await axios.post(`${apiUrl}/user`, newUser);
        if (response.status === 201) {
          try {
            const response = await axios.get(
              `${apiUrl}/user?e_mail=${form.e_mail}`
            );
            const data = response.data;
            console.log(data); //imprimo lo que trae el get del usuario
            const accessToken = response.data.accessToken;
            const userInfoWithToken = {
              ...newUser,
              accessToken: accessToken,
            };

            if (
              Object.keys(data).length > 0 &&
              data.user.e_mail === form.e_mail
            ) {
              toast.success("Usuario creado exitosamente!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
              });

              // Si el usuario está creado, lo tiene que logear
              dispatch(login(userInfoWithToken));

              if (newUser) {
                try {
                  // const userEmail = newUser.e_mail;
                  // const apiUrl = 'http://localhost:3001/user/profile';
                  // const response = await axios.get(`${apiUrl}?email=${userEmail}`);
                  // const userId = response.data.userId;
                  // history.push(`/user/profile/${userId}`);
                  history.push(`/home`);
                } catch (error) {
                  console.error(
                    "Error al obtener el ID del usuario:",
                    error.message
                  );
                }
              }

              // history.push("/home");
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

  useEffect(() => {
    if (loggedUser) history.push(`/home`);
  }, [loggedUser]);

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
                  <span className={styles.label}>Nombre</span>
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
                    
                  </div>
                </div>
                <div className={`${styles.cInput} ${styles["c-input"]}`}>
                  <div className={styles.data}>
                  <span className={styles.label}>Apellido</span>
                    <input
                      type="text"
                      value={form.lastName}
                      name="last_Name"
                      onChange={changeHandler}
                      className={styles.inputField}
                      required
                    />
                    {errors.lastName && (
                      <p className={styles.errorText}>{errors.lastName}</p>
                    )}
                   
                  </div>
                </div>
               
                <div
                  className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}
                >
                  <div className={styles.data}>
                  <span className={styles.label}>Contraseña</span>
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
                   
                  </div>
                </div>
              </div>
              <div className={`${styles.inputSection} ${styles["w-2/5"]}`}>
                <div
                  className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}
                >

                  <div className={styles.data}>
                  <span className={styles.label}>E-mail</span>
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
                  
                  </div>
                </div>
                <div
                  className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}
                >
                  <div className={styles.data}>
                  <span className={styles.label}>Celular</span>
                    <input
                      type="text"
                      value={form.whatsapp}
                      name="phone"
                      onChange={changeHandler}
                      className={styles.inputField}
                      required
                    />
                    {errors.whatsapp && (
                      <p className={styles.errorText}>{errors.whatsapp}</p>
                    )}
                   
                  </div>
                </div>
                <div
                  className={`${styles.cInput} ${styles["c-input"]} ${styles["mt-2"]}`}
                >
                  <div className={styles.data}>
                  <span className={styles.label}>Repetir Contraseña</span>
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
