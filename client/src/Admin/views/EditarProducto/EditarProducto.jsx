import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, putProduct } from "../../../redux/actions";
import style from "./EditarProducto.module.css";
import edit from "./../../../imagenes/edit.png";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import validation from "./validation";


const FormPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const stateProductType = useSelector((state) => state.productType);
  const stateColor = useSelector((state) => state.colorState);
  const stateMaterial = useSelector((state) => state.materialState);
  const [form, setForm] = useState("");
  const [errors, setErrors] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    setErrors(validation({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const validationErrors = validation(id,form);
    if (Object.keys(validationErrors).length === 0) {
      // Los datos son válidos, puedes enviar el formulario
      dispatch(putProduct(form));
    } else {
      // Mostrar errores en los campos
      setErrors(validationErrors);
    }
  };

  console.log(form);

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
        position: toast.POSITION.TOP_RIGHT,
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

  const toggleEdit = () => {
    setShowFilters(!showFilters);
  };

  const handleSelectMuebles = (event) => {
    const property = event.target.name;
    let value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);
  const stateDetail = useSelector((state) => state.detail);

  return (
    <div className={style.cntnForm}>
      <p className={style.tittle}>Editar Producto</p>
      <Form className={style.formConteiner} onSubmit={submitHandler}>
        <div onClick={toggleEdit}>
          <img src={edit} alt="" className={style.edit} />
        </div>
        {/*NOMBRE*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Nombre: </Form.Label>
            <Form.Label className={style.label}>{stateDetail.name}</Form.Label>
            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo nombre:{" "}
                </Form.Label>
                <Form.Control
                  onChange={changeHandler}
                  placeholder={stateDetail.name}
                  size="sm"
                  type="text"
                  value={form.name}
                  name="name"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          {/*PRECIO*/}
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Precio: </Form.Label>
            <Form.Label className={style.label}>{stateDetail.price}</Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo precio:{" "}
                </Form.Label>
                <Form.Control
                  onChange={changeHandler}
                  placeholder={stateDetail.price}
                  size="sm"
                  type="text"
                  value={form.price}
                  name="price"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*ALTURA*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Altura: </Form.Label>
            <Form.Label className={style.label}>
              {stateDetail.height}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nueva altura:{" "}
                </Form.Label>
                <Form.Control
                  onChange={changeHandler}
                  placeholder={stateDetail.height}
                  size="sm"
                  type="text"
                  value={form.height}
                  name="height"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*PROFUNDIDAD*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Profundida</Form.Label>
            <Form.Label className={style.label}>{stateDetail.depth}</Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nueva profundidad:{" "}
                </Form.Label>
                <Form.Control
                  onChange={changeHandler}
                  placeholder={stateDetail.depth}
                  size="sm"
                  type="text"
                  value={form.depth}
                  name="depth"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*ANCHO*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Ancho:</Form.Label>
            <Form.Label className={style.label}>{stateDetail.width}</Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo ancho:{" "}
                </Form.Label>
                <Form.Control
                  onChange={changeHandler}
                  placeholder={stateDetail.width}
                  size="sm"
                  type="text"
                  value={form.width}
                  name="width"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*PESO*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Peso:</Form.Label>
            <Form.Label className={style.label}>
              {stateDetail.weight}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo peso:{" "}
                </Form.Label>
                <Form.Control
                  onChange={changeHandler}
                  placeholder={stateDetail.weight}
                  size="sm"
                  type="text"
                  value={form.weight}
                  name="weight"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*STOCK*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Stock:</Form.Label>
            <Form.Label className={style.label}>{stateDetail.stock}</Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo stock:{" "}
                </Form.Label>
                <Form.Control
                  onChange={changeHandler}
                  placeholder={stateDetail.stock}
                  size="sm"
                  type="text"
                  value={form.stock}
                  name="stock"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*COLOR*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Color:</Form.Label>
            <Form.Label className={style.label}>{stateDetail.color}</Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Select
                  size="sm"
                  onChange={handleSelectMuebles}
                  value={form.color}
                  name="colorId"
                  className={style.select}
                >
                  <option>Seleccionar Nuevo Color</option>
                  {stateColor &&
                    stateColor.map((tipo, index) => {
                      return (
                        <option key={index} value={tipo.id} name={tipo.name}>
                          {tipo.name}
                        </option>
                      );
                    })}
                </Form.Select>
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*MATERIAL*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Material:</Form.Label>
            <Form.Label className={style.label}>
              {stateDetail.materialId}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Select
                  size="sm"
                  onChange={handleSelectMuebles}
                  value={form.productType}
                  name="materialId"
                  className={style.select}
                >
                  <option>Seleccionar Nuevo Material</option>
                  {stateMaterial &&
                    stateMaterial.map((tipo, index) => {
                      return (
                        <option key={index} value={tipo.id} name={tipo.name}>
                          {tipo.name}
                        </option>
                      );
                    })}
                </Form.Select>
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*TIPO DE PRODUCTo*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Tipo de Producto:</Form.Label>
            <Form.Label className={style.label}>
              {stateDetail.productTypeId}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Select
                  size="sm"
                  onChange={handleSelectMuebles}
                  value={form.productType}
                  name="productTypeId"
                  className={style.select}
                >
                  <option>Seleccionar Nuevo Tipo de Producto</option>
                  {stateProductType &&
                    stateProductType.map((tipo, index) => {
                      return (
                        <option key={index} value={tipo.id} name={tipo.name}>
                          {tipo.name}
                        </option>
                      );
                    })}
                </Form.Select>
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*DESCRIPCION*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Descripcion:</Form.Label>
            <Form.Label className={style.label}>
              {stateDetail.description}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nueva descripcion:{" "}
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={form.description}
                  name="description"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        {/*IMAGEN*/}
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={style.label}>Imagen:</Form.Label>
            <Container>
              <Row>
                <Col xs={8} md={3}>
                  <Image src={stateDetail.imagePath} thumbnail />
                </Col>
              </Row>
            </Container>
            {showFilters && (
              <div className={style.divinputError}>
                <header>
                  <div className={style.tittleSelectImage}>
                    <span>Selecciona nueva imagen:</span>
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
              </div>
            )}
          </Form.Group>
        </div>

        {
         showFilters && (Object.values(errors).every((error) => error === "") ? (
          <button type="submit" className={style.botonSubmit}>
            Enviar
          </button>
        ) : (
          <button type="submit" className={style.botonSubmitOff}>
            Enviar
          </button>
        ))}
      </Form>
    </div>
  );
};

export default FormPage;
