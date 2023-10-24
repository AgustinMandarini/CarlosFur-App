import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { postProduct } from "./../../../redux/actions";
import style from "./CrearProducto.module.css";
import validation from "./validation";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const CrearProducto = () => {
  const stateProductType = useSelector((state) => state.productType);
  const stateColor = useSelector((state) => state.colorState);
  const stateMaterial = useSelector((state) => state.materialState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const [form, setForm] = useState({});

  const [errors, setErrors] = useState({});

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
    // console.log(form);
    if (Object.keys(validationErrors).length === 0) {
      // Los datos son válidos, puedes enviar el formulario
      dispatch(postProduct(form));
    } else {
      // Mostrar errores en los campos
      setErrors(validationErrors);
    }
  };

  const handleSelectMuebles = (event) => {
    const property = event.target.name;
    let value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const isAnImageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff)$/i;
    if (file && isAnImageRegex.test(file.name)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
        setForm({ ...form, imageBase64: reader.result });
      };
    } else {
      toast.error("No es un formato de imagen válido", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const handleResetClick = (event) => {
    event.preventDefault();
    setPreview(null);
    setImage(null);

    const inputFile = document.getElementById("hidden-input");
    if (inputFile) {
      inputFile.value = ""; // Esto borra la selección de archivo anterior
    }
  };

  return (
    <div className={style.cntnForm}>
      <p className={style.tittle}>Nuevo Producto</p>
      <Form className={style.formConteiner} onSubmit={submitHandler}>
        <Form.Group className={style.formGroup} controlId="formBasicEmail">
          <Form.Label className={style.label}>Nombre: </Form.Label>
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

        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label}>Precio:</Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="number"
              value={form.price}
              onChange={changeHandler}
              name="price"
              className={style.input}
            />

            <Form.Text className={style.error}>
              {errors.price && formSubmitted ? <span>{errors.price}</span> : ""}{" "}
            </Form.Text>
          </div>
        </Form.Group>
        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label}>Altura:</Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="number"
              value={form.height}
              onChange={changeHandler}
              name="height"
              className={style.input}
            />

            <Form.Text className={style.error}>
              {errors.height && formSubmitted ? (
                <span>{errors.height}</span>
              ) : (
                ""
              )}
            </Form.Text>
          </div>
        </Form.Group>
        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label}>Profundidad:</Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="number"
              value={form.depth}
              onChange={changeHandler}
              name="depth"
              className={style.input}
            />
            <Form.Text className={style.error}>
              {errors.depth && formSubmitted ? <span>{errors.depth}</span> : ""}
            </Form.Text>
          </div>
        </Form.Group>
        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label}>Ancho:</Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="number"
              value={form.width}
              onChange={changeHandler}
              name="width"
              className={style.input}
            />

            <Form.Text className={style.error}>
              {errors.width && formSubmitted ? <span>{errors.width}</span> : ""}
            </Form.Text>
          </div>
        </Form.Group>
        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label}>Peso:</Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="number"
              value={form.weight}
              onChange={changeHandler}
              name="weight"
              className={style.input}
            />

            <Form.Text className={style.error}>
              {errors.weight && formSubmitted ? (
                <span>{errors.weight}</span>
              ) : (
                ""
              )}
            </Form.Text>
          </div>
        </Form.Group>

        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label}>Stock:</Form.Label>
          <div className={style.divinputError}>
            <Form.Control
              size="sm"
              type="number"
              value={form.stock}
              onChange={changeHandler}
              name="stock"
              className={style.input}
            />

            <Form.Text className={style.error}>
              {errors.stock && formSubmitted ? <span>{errors.stock}</span> : ""}
            </Form.Text>
          </div>
        </Form.Group>

        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label} name="color">
            Color:
          </Form.Label>
          <div className={style.divinputErrorType}>
            <Form.Select
              size="sm"
              onChange={handleSelectMuebles}
              value={form.color}
              name="colorId"
              className={style.select}
            >
              <option>Seleccionar color</option>
              {stateColor &&
                stateColor.map((tipo, index) => {
                  return (
                    <option key={index} value={tipo.id} name={tipo.name}>
                      {tipo.name}
                    </option>
                  );
                })}
            </Form.Select>

            <Form.Text className={style.error}>
              {errors.colorId && formSubmitted ? (
                <span>{errors.colorId}</span>
              ) : (
                ""
              )}
            </Form.Text>
          </div>
        </Form.Group>

        {/* //Material */}
        <Form.Group
          className={style.formGroupSpecial}
          controlId="formBasicPassword"
        >
          <Form.Label className={style.label} name="material">
            Material:
          </Form.Label>
          <div className={style.divinputErrorType}>
            <Form.Select
              size="sm"
              onChange={handleSelectMuebles}
              value={form.material}
              name="materialId"
              className={style.select}
            >
              <option>Seleccionar material</option>
              {Array.isArray(stateMaterial) &&
                stateMaterial.map((tipo, index) => {
                  return (
                    <option key={index} value={tipo.id} name={tipo.name}>
                      {tipo.name}
                    </option>
                  );
                })}
            </Form.Select>

            <Form.Text className={style.error}>
              {errors.materialId && formSubmitted ? (
                <span>{errors.materialId}</span>
              ) : (
                ""
              )}
            </Form.Text>
          </div>
        </Form.Group>

        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label} name="productType">
            Tipo de Producto:
          </Form.Label>
          <div className={style.divinputErrorType}>
            <Form.Select
              size="sm"
              onChange={handleSelectMuebles}
              value={form.productType}
              name="productTypeId"
              className={style.select}
            >
              <option>Seleccionar Tipo de Producto</option>
              {stateProductType &&
                stateProductType !== undefined &&
                stateProductType.map((tipo, index) => {
                  return (
                    <option key={index} value={tipo.id} name={tipo.name}>
                      {tipo.name}
                    </option>
                  );
                })}
            </Form.Select>

            <Form.Text className={style.error}>
              {errors.productTypeId && formSubmitted ? (
                <span>{errors.productTypeId}</span>
              ) : (
                ""
              )}
            </Form.Text>
          </div>
        </Form.Group>
        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label}>Descripcion:</Form.Label>
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
              )}
            </Form.Text>
          </div>
        </Form.Group>
        <div className={style.divSelectImage}>
          <header>
            <div className={style.tittleSelectImage}>
              <span>Selecciona un archivo</span>&nbsp;
            </div>
            <div className={style.inputSelectImage}>
              <input
                id="hidden-input"
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <div>
                {preview && (
                  <img
                    className={style.imageForm}
                    src={preview}
                    alt="preview"
                  />
                )}
              </div>
            </div>
          </header>
          <button className={style.botonReset} onClick={handleResetClick}>
            Reset
          </button>
        </div>
        {loading ? (
          <div>
            <div></div>
            <span>Processing...</span>
          </div>
        ) : (
          url && (
            <div>
              <img src={preview} alt="preview" />
            </div>
          )
        )}
        {errors.imageBase64 ? (
          <span className={style.error}>{errors.imageBase64}</span>
        ) : (
          ""
        )}
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
    </div>
  );
};

export default CrearProducto;
