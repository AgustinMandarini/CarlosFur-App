const validation = (formState) => {
  const errors = {};

  //Nombre
  if (!formState.name) {
    errors.name = "Por favor completa este campo";
  } else if (formState.name.length > 20) {
    errors.name = "El nombre del color no puede superar los 20 caracteres";
  } else if (/\d/.test(formState.name)) {
    errors.name = "El nombre del color no puede contener números";
  }

  //Descripcion
  if (!formState.description) {
    errors.description = "Por favor completa este campo";
  }

  const hasErrors = Object.keys(errors).length === 0;

  return hasErrors ? true : errors;
};

export default validation;
