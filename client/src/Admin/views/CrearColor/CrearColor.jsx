import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { postColor } from "./../../../redux/actions";
import style from "./CrearColor.module.css";
import validation from "./validation";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CrearProducto = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modal, setModal] = useState(false);

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    setErrors(validation({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const validationErrors = validation(form);
    if (Object.keys(validationErrors).length === 0) {
      // Los datos son válidos, puedes enviar el formulario
      dispatch(postColor(form));
      setModal(true);
    } else {
      // Mostrar errores en los campos
      setErrors(validationErrors);
    }
  };

  const handleAcept = () => {
    setModal(false);
  };

  return (
    <div className={style.cntnForm}>
      <p className={style.tittle}>Nuevo Color:</p>
      <Form className={style.formConteiner} onSubmit={submitHandler}>
        <Form.Group className={style.formGroup} controlId="formBasicEmail">
          <Form.Label className={style.label}>Nombre del color: </Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="text"
              value={form.name}
              onChange={changeHandler}
              name="name"
              className={style.input}
            />
            <Form.Text className={style.error}>
              {errors.name && formSubmitted ? <span>{errors.name}</span> : ""}{" "}
            </Form.Text>
          </div>
        </Form.Group>

        {/DESCRIPCION/}
        <Form.Group className={style.formGroup} controlId="formBasicEmail">
          <Form.Label className={style.label}>Descripcion: </Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="text"
              value={form.description}
              onChange={changeHandler}
              name="description"
              className={style.input}
            />
            <Form.Text className={style.error}>
              {errors.description && formSubmitted ? (
                <span>{errors.description}</span>
              ) : (
                ""
              )}{" "}
            </Form.Text>
          </div>
        </Form.Group>

        {Object.values(errors).every((error) => error === "") ? (
          <button type="submit" className={style.botonSubmit}>
            Enviar
          </button>
        ) : (
          <button type="submit" className={style.botonSubmitOff}>
            Enviar
          </button>
        )}
      </Form>
      <Modal show={modal}>
        <Modal.Header className={style.headerModal}>
          <Modal.Title>Color Creado</Modal.Title>
        </Modal.Header>
        <Modal.Footer className={style.footerModal}>
          <Button
            variant="secondary"
            onClick={handleAcept}
            className={style.buttonModal}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CrearColor;

