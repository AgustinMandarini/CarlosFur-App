const { findUser } = require("../controllers/getUserController");

const getUserHandler = async (req, res) => {
  try {
    const { userName, email, password } = req.query;
    const user = await findUser(userName, email, password);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserHandler };
