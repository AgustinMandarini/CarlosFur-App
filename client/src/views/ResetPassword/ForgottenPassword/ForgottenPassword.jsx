import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./ForgottenPassword.module.css";
import validation from "./validation";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const ForgottenPassword = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();
  const loggedUser = useSelector((state) => state.loggedUser);
  const [modal, setModal] = useState(false);

  const handleAcept = () => {
    setModal(false);
    history.push("/home");
  };

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

  const submitHandler = async (event) => {
    event.preventDefault();
    const validationErrors = validation(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Envia la direccion de email a la ruta en el back que se encargara de generar la URL
        // y enviarsela al usuario a ese email provisto
        await axios.post(`${apiUrl}/user/change-password`, {
          e_mail: form.e_mail,
        });
        setModal(true);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
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
            {errors.e_mail && (
              <p className={styles.errorText}>{errors.e_mail}</p>
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
      <Modal show={modal}>
        <Modal.Header className={styles.headerModal}>
          <Modal.Title>Email enviado exitosamente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Revise su casilla de correo electrónico. Le hemos enviado
          instrucciones para restablecer su contraseña. Si no recibe el correo
          electrónico en unos minutos, verifique su carpeta de correo no deseado
          o spam.
        </Modal.Body>
        <Modal.Footer className={styles.footerModal}>
          <Button onClick={handleAcept} className={styles.buttonModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgottenPassword;
