const validation = (formState) => {
  let errors = {};
  // name:"",
  // price:"",
  // height:"",
  // depth:"",
  // width:"",
  // weight:"",
  // color:"",
  // description:""

  //Nombre
  if (!formState.name) errors.name = "Por favor completa este campo";
  else if (formState.name.length > 20)
    errors.name = "El nombre del mueble no puede superar los 20 caracteres ";
  else if (/\d/.test(formState.name))
    errors.name = "El nombre del mueble no puede contener numeros";
  //Precio
  if (!formState.price) errors.price = "Por favor completa este campo";
  else if (isNaN(formState.price))
    errors.price = "Por favor, ingrese solo números.";
  else if (formState.price < 0) errors.price = "Indique un valor mayor a cero.";

  //Altura
  if (!formState.height) errors.height = "Por favor completa este campo";
  else if (isNaN(formState.height))
    errors.height = "Por favor, ingrese solo números.";

  //Profundidad
  if (!formState.depth) errors.depth = "Por favor completa este campo";
  else if (isNaN(formState.depth))
    errors.depth = "Por favor, ingrese solo números.";

  //Ancho
  if (!formState.width) errors.width = "Por favor completa este campo";
  else if (isNaN(formState.width))
    errors.width = "Por favor, ingrese solo números.";

  //Peso
  if (!formState.weight) errors.weight = "Por favor completa este campo";
  else if (isNaN(formState.weight))
    errors.weight = "Por favor, ingrese solo números.";

  //Color
  if (!formState.color) errors.color = "Por favor completa este campo";
  else if (formState.color.length > 20)
    errors.color = "El color del mueble no puede superar los 20 caracteres ";
  else if (/\d/.test(formState.color))
    errors.color = "El color del mueble no puede contener numeros";

  //Descripcion
  if (!formState.description)
    errors.description = "Por favor completa este campo";

  if (!formState.imageBase64)
    errors.imageBase64 = "Por favor adjunte una imagen";
  else if (!/\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(formState.imageBase64)) {
    errors.imageBase64 = "Formato de imagen inválido";
  }

  const hasErrors = Object.keys(errors).length === 0; //si el objeto errors tiene propiedades-->true, por lo tanto no habria errores

  if (hasErrors) {
    return true; // No hay errores
  } else {
    return errors; // Devolver el objeto de errores
  }
};
export default validation;
