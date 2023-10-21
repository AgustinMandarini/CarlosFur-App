// Validador de token para cambio de contraseña.
// Se encuentra implementado como middleware en la ruta put /update-password
const jwt = require("jsonwebtoken");

const emailAuthJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (error, userEmail) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return res.sendStatus(403).json({ error: "El token ha expirado" });
        }
        return res.sendStatus(403).json({ error: error.message });
      }
      req.userEmail = userEmail;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { emailAuthJWT };
