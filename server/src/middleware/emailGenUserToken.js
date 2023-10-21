// Generador de token para cambio de contraseña
const jwt = require("jsonwebtoken");

function emailGenUserToken(data) {
  // El token de recuperacion de contraseña tiene una validez de media hora para ser utilizado
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

module.exports = { emailGenUserToken };
