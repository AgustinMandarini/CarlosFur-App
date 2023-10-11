//getUserHandler.js
const { loginUser } = require("../../controllers/LoginController/loginController");

const loginHandler = async (req, res) => {
  try {
    const userAutolog = req.userAutolog;
    console.log(
      "DESDE EL CONTROLLER, HAY AUTOLOG?: " + JSON.stringify(userAutolog)
    );
    const { e_mail, password, auth0Email, auth0UserName } = req.body;
    const user = await loginUser(
      e_mail,
      password,
      auth0Email,
      auth0UserName,
      userAutolog
    );
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
