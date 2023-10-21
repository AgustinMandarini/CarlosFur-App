const validation = (formState) => {
  let errors = {};
  const regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

  if (!formState.password) {
    errors.password = "Ingrese una contraseña";
  } else if (formState.password.length < 6 || formState.password.length > 10) {
    errors.password = "Debe tener entre 8 y 12 caracteres";
  } else if (!regexPassword.test(formState.password)) {
    errors.password =
      "Debe tener un caracter especial, una mayuscula y un número";
  }

  if (formState.confPassword !== formState.password) {
    errors.confPassword = "Las contraseñas no coinciden";
  }
  return errors; // Devolver el objeto de errores
};
export default validation;
