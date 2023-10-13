import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../redux/actions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import style from "./Form.module.css";
import validation from "./validation";

const FormPage = () => {
  const stateProductType = useSelector((state) => state.productType);
  const stateColor = useSelector((state) => state.colorState);
  const stateMaterial = useSelector((state) => state.materialState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    price: "",
    height: "",
    depth: "",
    width: "",
    weight: "",
    stock: "",
    color: "",
    material:"",
    description: "",
    productType: "",
    imageBase64: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    height: "",
    depth: "",
    width: "",
    weight: "",
    stock: "",
    color: "",
    material: "",
    description: "",
    productType: "",
    imageBase64: "",
  });



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
        console.log(errors);
      };
    } else {
      window.alert("No es un formato de imagen valido");
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
              name="color"
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
              {errors.color && formSubmitted ? (
                <span>{errors.color}</span>
              ) : (
                ""
              )}
            </Form.Text>
          </div>
        </Form.Group>
                {/* //Material */}
        <Form.Group className={style.formGroup} controlId="formBasicPassword">
          <Form.Label className={style.label} name="material">
            Material:
          </Form.Label>
          <div className={style.divinputErrorType}>
            <Form.Select
              size="sm"
              onChange={handleSelectMuebles}
              value={form.material}
              name="material"
              className={style.select}
            >
              <option>Seleccionar material</option>
              {stateMaterial &&
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
              name="productType"
              className={style.select}
            >
              <option>Seleccionar Tipo de Producto</option>
              {stateProductType &&
                stateProductType.map((tipo, index) => {
                  return (
                    <option key={index} value={tipo.id} name={tipo.name}>
                      {tipo.name}
                    </option>
                  );
                })}
            </Form.Select>

            <Form.Text className={style.error}>
              {errors.productType && formSubmitted ? (
                <span>{errors.productType}</span>
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
        {errors.imageBase64 ? <span>{errors.imageBase64}</span> : ""}
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

    //   <form onSubmit={submitHandler} className={style.formContainer}>
    //     <div>
    //       <h1>Nuevo Mueble</h1>
    //     </div>
    //     <div className={style.container}>
    //       <label>Nombre:</label>
    //       <input
    //         type="text"
    //         value={form.name}
    //         onChange={changeHandler}
    //         name="name"
    //       />
    //       {errors.name ? <span>{errors.name}</span> : null}
    //     </div>
    //     <div className={style.container}>
    //       <label>Precio:</label>
    //       <input
    //         type="number"
    //         value={form.price}
    //         onChange={changeHandler}
    //         name="price"
    //       />
    //       {errors.price ? <span>{errors.price}</span> : null}
    //     </div>
    //     <div className={style.container}>
    //       <label>Altura:</label>
    //       <input
    //         type="number"
    //         value={form.height}
    //         onChange={changeHandler}
    //         name="height"
    //       />
    //       {errors.height ? <span>{errors.height}</span> : null}
    //     </div>
    //     <div className={style.container}>
    //       <label>Profundidad:</label>
    //       <input
    //         type="number"
    //         value={form.depth}
    //         onChange={changeHandler}
    //         name="depth"
    //       />
    //       {errors.depth ? <span>{errors.depth}</span> : null}
    //     </div>
    //     <div className={style.container}>
    //       <label>Ancho:</label>
    //       <input
    //         type="number"
    //         value={form.width}
    //         onChange={changeHandler}
    //         name="width"
    //       />
    //       {errors.width ? <span>{errors.width}</span> : null}
    //     </div>
    //     <div className={style.container}>
    //       <label>Peso:</label>
    //       <input
    //         type="number"
    //         value={form.weight}
    //         onChange={changeHandler}
    //         name="weight"
    //       />
    //       {errors.weight ? <span>{errors.weight}</span> : null}
    //     </div>
    //     <div className={style.container}>
    //       <label>Color:</label>
    //       <input
    //         type="text"
    //         value={form.color}
    //         onChange={changeHandler}
    //         name="color"
    //       />
    //       {errors.color ? <span>{errors.color}</span> : null}
    //     </div>
    //     <div className={style.container}>
    //       <label>Descripcion:</label>
    //       <input
    //         type="text"
    //         value={form.description}
    //         onChange={changeHandler}
    //         name="description"
    //       />
    //       {errors.description ? <span>{errors.description}</span> : null}
    //     </div>

    //     <div className={style.container}>
    //       <label name="productType">Selecciona el tipo de Producto:</label>
    //       <select
    //         onChange={handleSelectMuebles}
    //         value={form.productType}
    //         name="productType"
    //       >
    //         {stateProductType &&
    //           stateProductType.map((tipo, index) => {
    //             return (
    //               <option key={index} value={tipo.id} name={tipo.name}>
    //                 {tipo.name}
    //               </option>
    //             );
    //           })}
    //       </select>
    //       {errors.productType ? <span>{errors.productType}</span> : null}
    //     </div>
    //     <div>
    //       <header>
    //         <p>
    //           <span>Click en seleccionar archivo</span>&nbsp;
    //         </p>
    //         <input
    //           id="hidden-input"
    //           type="file"
    //           className="hidden"
    //           onChange={handleImageChange}
    //           accept="image/*"
    //         />
    //         <div>{preview && <img src={preview} alt="preview" />}</div>
    //       </header>
    //       <div>
    //         <button onClick={handleResetClick}>Reset</button>
    //       </div>
    //       {loading ? (
    //         <div>
    //           <div></div>
    //           <span>Processing...</span>
    //         </div>
    //       ) : (
    //         url && (
    //           <div>
    //             <img src={preview} alt="preview" />
    //           </div>
    //         )
    //       )}
    //     </div>
    //     {errors.imageBase64 ? <span>{errors.imageBase64}</span> : null}
    //     {Object.values(errors).every((error) => error === "") ? (
    //       <button type="submit" className={style.botonSubmit}>
    //         Enviar
    //       </button>
    //     ) : (
    //       <button type="submit" className={style.botonSubmitOff}>
    //         Enviar
    //       </button>
    //     )}
    //   </form>
    //
  );
};

export default FormPage;
