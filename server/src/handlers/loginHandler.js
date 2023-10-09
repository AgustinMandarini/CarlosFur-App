//getUserHandler.js
const { loginUser } = require("../controllers/loginController");

const loginHandler = async (req, res) => {
  try {
    const { e_mail, password, auth0Email, auth0UserName } = req.body;
    const user = await loginUser(e_mail, password, auth0Email, auth0UserName);
    if (user.length === 0) {
      res.status(404).send({ error: "El usuario no esta registrado" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).json({ error: "El usuario no esta registrado" });
  }
};

module.exports = { loginHandler };
