export function validate(input) {
    let errors = {};
  
    if (!input.name) {
      errors.name = "Se requiere el nombre";
    }
  
    if (input.email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(input.email)) {
      errors.email = "El email es inválido";
    }
  
    if (!input.password) {
      errors.password = "Se requiere contraseña";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(input.password)
    ) {
      errors.password =
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.";
    }
  
    if (!input.lastName) {
      errors.lastName = "Se requiere el apellido";
    }
  
    if (!input.whatsapp) {
      errors.whatsapp = "Se requiere el número de celular";
    }
  
    if (!input.password2) {
      errors.password2 = "Se requiere repetir la contraseña";
    } else if (input.password2 !== input.password) {
      errors.password2 = "Las contraseñas no coinciden";
    }
  
    return errors;
  }
  