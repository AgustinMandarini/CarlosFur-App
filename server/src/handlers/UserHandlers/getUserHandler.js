//getUserHandler.js
const {
  findUser,
  findUserById,
  findUserByEmail,
} = require("../../controllers/UserControllers/getUserController");

const getUserHandler = async (req, res) => {
  try {
    const { userName, e_mail, password } = req.query;
    const user = await findUser(userName, e_mail, password);
    if (user.length === 0) {
      res.status(404).send({ error: "El usuario no esta registrado" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).json({ error: "El usuario no esta registrado" });
  }
};

const getUserByIdHandler = async (req, res) => {
  console.log(res);
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);

    res.status(200).send(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


const getUserByEmailHandler = async (req, res) => {
  try {
    const { email } = req.query;
    console.log(email);
    const user = await findUserByEmail(email);

    res.status(200).send(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


module.exports = { getUserHandler, getUserByIdHandler, getUserByEmailHandler };
