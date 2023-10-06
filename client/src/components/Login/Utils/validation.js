// validation.js
export function validate(input) {
    let errors = {};
  
    if (input.email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(input.email)) {
      errors.email = "El email es inválido";
    }
  
    if (!input.password) {
      errors.password = "Se requiere contraseña";
    }
  
    return errors;
  }
    