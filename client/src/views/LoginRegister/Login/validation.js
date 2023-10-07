const validation = (formState) => {
  let errors = {};
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

  if (!formState.e_mail) {
    errors.e_mail = "Se requiere un email";
  } else if (!regexEmail.test(formState.e_mail)) {
    errors.e_mail = "Ingrese un formato de email valido";
  } else if (formState.e_mail.length > 35) {
    errors.e_mail = "Superaste el maximo de caracteres";
  }

  if (!formState.password) {
    errors.password = "Ingrese una contraseña";
  }
  return errors; // Devolver el objeto de errores
};
export default validation;
