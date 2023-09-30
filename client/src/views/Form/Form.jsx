import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMueble } from "../../redux/actions";
import style from "./Form.module.css";
import validation from "./validation";

const FormPage = () => {
  const stateProductType = useSelector((state) => state.productType);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    price: "",
    height: "",
    depth: "",
    width: "",
    weight: "",
    color: "",
    description: "",
    productType: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    height: "",
    depth: "",
    width: "",
    weight: "",
    color: "",
    description: "",
    productType: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    setErrors(validation({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (errors === true) {
      dispatch(postMueble(form)); //si errors no tiene errores dispatcha createMueble (crea nuevo mueble en la BDD)
    } else alert("No se pudo crear, por favor complete todo el formulario");
    setForm({
      name: "",
      price: "",
      height: "",
      depth: "",
      width: "",
      weight: "",
      color: "",
      description: "",
      productType: "",
    });
  };

  const handleSelectCountries = (event) => {
    const property = event.target.name;
    let value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  return (
    <form onSubmit={submitHandler} className={style.formContainer}>
      <div>
        <h1>Nuevo Mueble</h1>
      </div>
      <div className={style.container}>
        <label>Nombre:</label>
        <input
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
        />
        {errors.name ? <span>{errors.name}</span> : null}
      </div>
      <div className={style.container}>
        <label>Precio:</label>
        <input
          type="number"
          value={form.price}
          onChange={changeHandler}
          name="price"
        />
        {errors.price ? <span>{errors.price}</span> : null}
      </div>
      <div className={style.container}>
        <label>Altura:</label>
        <input
          type="number"
          value={form.height}
          onChange={changeHandler}
          name="height"
        />
        {errors.height ? <span>{errors.height}</span> : null}
      </div>
      <div className={style.container}>
        <label>Profundidad:</label>
        <input
          type="number"
          value={form.depth}
          onChange={changeHandler}
          name="depth"
        />
        {errors.depth ? <span>{errors.depth}</span> : null}
      </div>
      <div className={style.container}>
        <label>Ancho:</label>
        <input
          type="number"
          value={form.width}
          onChange={changeHandler}
          name="width"
        />
        {errors.width ? <span>{errors.width}</span> : null}
      </div>
      <div className={style.container}>
        <label>Peso:</label>
        <input
          type="number"
          value={form.weight}
          onChange={changeHandler}
          name="weight"
        />
        {errors.weight ? <span>{errors.weight}</span> : null}
      </div>
      <div className={style.container}>
        <label>Color:</label>
        <input
          type="text"
          value={form.color}
          onChange={changeHandler}
          name="color"
        />
        {errors.color ? <span>{errors.color}</span> : null}
      </div>
      <div className={style.container}>
        <label>Descripcion:</label>
        <input
          type="text"
          value={form.description}
          onChange={changeHandler}
          name="description"
        />
        {errors.description ? <span>{errors.description}</span> : null}
      </div>

      <div className={style.container}>
        <label name="productType">Selecciona el tipo de Producto:</label>
        <select
          onChange={handleSelectCountries}
          value={form.productType}
          name="productType"
        >
          {stateProductType &&
            stateProductType.map((tipo, index) => {
              return (
                <option key={index} value={tipo.id} name={tipo.name}>
                  {tipo.name}
                </option>
              );
            })}
        </select>
        {errors.productType ? <span>{errors.productType}</span> : null}
      </div>
      {Object.values(errors).every((error) => error === "") ? (
        <button type="submit" className={style.botonSubmit}>
          Enviar
        </button>
      ) : (
        <button type="submit" className={style.botonSubmitOff}>
          Enviar
        </button>
      )}
    </form>
  );
};

export default FormPage;
