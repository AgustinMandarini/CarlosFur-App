const validation = (formState) => {
  let errors = {};

  //Nombre
  if (!formState.nombre) errors.nombre = "Por favor completa este campo";
  else if (formState.nombre.length > 20)
    errors.nombre = "El nombre del mueble no puede superar los 20 caracteres ";
  else if (/\d/.test(formState.nombre))
    errors.nombre = "El nombre del mueble no puede contener numeros";
  //Precio
  if (!formState.precio) errors.precio = "Por favor completa este campo";
  else if (isNaN(formState.precio))
    errors.precio = "Por favor, ingrese solo números.";

  //Altura
  if (!formState.altura) errors.altura = "Por favor completa este campo";
  else if (isNaN(formState.altura))
    errors.altura = "Por favor, ingrese solo números.";

    //Profundidad
  if (!formState.profundidad) errors.profundidad = "Por favor completa este campo";
  else if (isNaN(formState.profundidad))
    errors.profundidad = "Por favor, ingrese solo números.";

//Ancho
if (!formState.ancho) errors.ancho = "Por favor completa este campo";
else if (isNaN(formState.ancho))
  errors.ancho = "Por favor, ingrese solo números.";

//Peso
  if (!formState.peso) errors.peso = "Por favor completa este campo";
  else if (isNaN(formState.peso))
    errors.peso = "Por favor, ingrese solo números.";

//Color
  if (!formState.color) errors.color = "Por favor completa este campo";
  else if (formState.color.length > 20)
    errors.color = "El color del mueble no puede superar los 20 caracteres ";
  else if (/\d/.test(formState.color))
    errors.color = "El color del mueble no puede contener numeros";

    //Descripcion
  if (!formState.descripcion) errors.descripcion = "Por favor completa este campo";
  
  const hasErrors = Object.keys(errors).length === 0; //si el objeto errors tiene propiedades-->true, por lo tanto no habria errores

  if (hasErrors) {
    return true; // No hay errores
  } else {
    return errors; // Devolver el objeto de errores
  }
};
export default validation;
