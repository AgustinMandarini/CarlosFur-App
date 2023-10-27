import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import styles from "./ResetPassword.module.css";
import validation from "./validation";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();
  const loggedUser = useSelector((state) => state.loggedUser);

  const [form, setForm] = useState({
    password: "",
    confPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confPassword: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    setErrors(validation({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const validationErrors = validation(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const emailToken = window.location.pathname.split("/")[2];
      try {
        await axios.put(
          `${apiUrl}/user/update-password`,
          {
            password: form.password,
          },
          {
            headers: {
              Authorization: `Bearer ${emailToken}`,
            },
          }
        );
        toast.success("Contraseña actualizada exitosamente!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
        history.push("/home");
      } catch (error) {
        if (error.response.status === 403) {
          toast.error(
            "El token ha vencido. Solicita un nuevo enlace de restablecimiento.",
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000,
            }
          );
        } else {
          toast.error(`${error}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Restablecer contraseña</h2>
        <form className={styles.form} onSubmit={submitHandler} noValidate>
          {/* Password input */}
          <div className={`${styles.inputContainer} ${styles.mt2}`}>
            <span className={styles.label}>Contraseña nueva</span>
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
          {/* confPassword input */}
          <div className={`${styles.inputContainer} ${styles.mt2}`}>
            <span className={styles.label}>Confirmar contraseña</span>
            <div className={styles.data}>
              <input
                type="password"
                placeholder=""
                className={`${styles.input} ${
                  errors.confPassword && styles.error
                }`}
                name="confPassword"
                value={form.confPassword}
                onChange={changeHandler}
                required
              />
            </div>
          </div>
          {errors.confPassword && (
            <p className={styles.errorText}>{errors.confPassword}</p>
          )}

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

export default ResetPassword;
