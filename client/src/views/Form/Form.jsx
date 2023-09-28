import { useState } from "react";
import style from "./Form.module.css"
import validation from "./validation";
// import {useDispatch} from "react-redux"

const FormPage = () => {
    const [form, setForm] = useState({
        nombre:"",
        precio:"",
        altura:"",
        profundidad:"",
        ancho:"",
        peso:"",
        color:"",
        descripcion:""
    })
    const [errors, setErrors] = useState({
        nombre:"",
        precio:"",
        altura:"",
        profundidad:"",
        ancho:"",
        peso:"",
        color:"",
        descripcion:""
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        let value = event.target.value;

        setErrors(validation({ ...form, [property]: value }));
        setForm({...form, [property]: value})
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // if(errors === true) dispatch(createMueble(form));//si errors no tiene errores dispatcha createMueble (crea nuevo mueble en la BDD)
        // else alert("No se pudo crear, por favor complete todo el formulario");
    setForm({ nombre:"",
    precio:"",
    altura:"",
    profundidad:"",
    ancho:"",
    peso:"",
    color:"",
    descripcion:""})
   
    }

   
  return (
    <form  onSubmit={submitHandler}  className={style.formContainer}>
      <div className={style.container}>
        <h1>Nuevo Mueble</h1>
      </div>
      <div className={style.container}>
        <label>Nombre:</label>
        <input
          type="text"
          value={form.nombre}
          onChange={changeHandler}
          name="nombre"
        />
        {errors.nombre ? <span>{errors.nombre}</span> : null}
      </div>
      <div className={style.container}>
        <label>Precio:</label>
        <input
          type="number"
          value={form.precio}
          onChange={changeHandler}
          name="precio"
        />
        {errors.precio ? <span>{errors.precio}</span> : null}
      </div>
      <div className={style.container}>
        <label>Altura:</label>
        <input
          type="number"
          value={form.altura}
          onChange={changeHandler}
          name="altura"
        />
        {errors.altura ? <span>{errors.altura}</span> : null}
      </div>
      <div className={style.container}>
        <label>Profundidad:</label>
        <input
          type="number"
          value={form.profundidad}
          onChange={changeHandler}
          name="profundidad"
        />
        {errors.profundidad ? <span>{errors.profundidad}</span> : null}
      </div>
      <div className={style.container}>
        <label>Ancho:</label>
        <input
          type="number"
          value={form.ancho}
          onChange={changeHandler}
          name="ancho"
        />
        {errors.ancho ? <span>{errors.ancho}</span> : null}
      </div>
      <div className={style.container}>
        <label>Peso:</label>
        <input
          type="number"
          value={form.peso}
          onChange={changeHandler}
          name="peso"
        />
        {errors.peso ? <span>{errors.peso}</span> : null}
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
          value={form.descripcion}
          onChange={changeHandler}
          name="descripcion"
        />
        {errors.descripcion ? <span>{errors.descripcion}</span> : null}
      </div>
      <button type="submit" className={style.botonSubmit}>
        Enviar
      </button>
    </form>
  );
};

export default FormPage;
