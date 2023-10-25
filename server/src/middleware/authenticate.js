// authenticate.js
async function authenticate(req, res, next) {
  const {
    findUserById,
  } = require("../controllers/UserControllers/getUserController");

  try {
    const user = await findUserById(req.params.userId);

    if (user) {
      if (user.is_admin) {
        // Si el usuario es administrador, permite el acceso
        next();
      } else {
        res
          .status(403)
          .json({ error: "Acceso denegado para no administradores" });
      }
    } else {
      res.status(401).json({ error: "Acceso no autenticado" });
    }
  } catch (error) {
    res.status(500).json({ error: "No existe el usuario" });
  }
}

module.exports = authenticate;
