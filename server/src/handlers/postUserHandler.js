const { createUser } = require("../controllers/postUserController");

const postUserHandler = async (req, res) => {
  try {
    const { user_name, password, e_mail, first_name, last_name } = req.body;
    const newUser = await createUser(
      user_name,
      password,
      e_mail,
      first_name,
      last_name
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { postUserHandler };
