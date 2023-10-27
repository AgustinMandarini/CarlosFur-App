const validation = (formState) => {
  const errors = {};

  //Nombre
  if (!formState.name) {
    errors.name = "Por favor completa este campo";
  } else if (formState.name.length > 20) {
    errors.name = "El nombre del mueble no puede superar los 20 caracteres";
  } else if (/\d/.test(formState.name)) {
    errors.name = "El nombre del mueble no puede contener números";
  }

  //Precio
  if (!formState.price) {
    errors.price = "Por favor completa este campo";
  } else if (isNaN(formState.price)) {
    errors.price = "Por favor, ingrese solo números.";
  }

  //stock
  if (!formState.stock) {
    errors.stock = "Por favor completa este campo";
  } else if (isNaN(formState.stock)) {
    errors.stock = "Por favor, ingrese solo números.";
  }

  //Altura
  if (!formState.height) {
    errors.height = "Por favor completa este campo";
  } else if (isNaN(formState.height)) {
    errors.height = "Por favor, ingrese solo números.";
  }

  //Profundidad
  if (!formState.depth) {
    errors.depth = "Por favor completa este campo";
  } else if (isNaN(formState.depth)) {
    errors.depth = "Por favor, ingrese solo números.";
  }

  //Ancho
  if (!formState.width) {
    errors.width = "Por favor completa este campo";
  } else if (isNaN(formState.width)) {
    errors.width = "Por favor, ingrese solo números.";
  }

  //Peso
  if (!formState.weight) {
    errors.weight = "Por favor completa este campo";
  } else if (isNaN(formState.weight)) {
    errors.weight = "Por favor, ingrese solo números.";
  }

  // Validar Tipo de Producto
  if (!formState.productTypeId) {
    errors.productTypeId = "Por favor seleccione un Tipo de Producto";
  }

  // Validar Material
  if (!formState.materialId) {
    errors.materialId = "Por favor seleccione un Material";
  }

  // Validar Color
  if (!formState.colorId) {
    errors.colorId = "Por favor seleccione un Color";
  }

  //Descripcion
  if (!formState.description) {
    errors.description = "Por favor completa este campo";
  }

  // Validar campo de imagen
  if (!formState.imageBase64 || formState.imageBase64 === null) {
    errors.imageBase64 = "Por favor adjunte una imagen";
  }

  const hasErrors = Object.keys(errors).length === 0;

  return hasErrors ? true : errors;
};

export default validation;
