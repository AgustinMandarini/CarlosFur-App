//postUserHandler.js

const { createUser } = require("../../controllers/UserControllers/postUserController");

const postUserHandler = async (req, res) => {
  try {
    const { user_name, password, e_mail, first_name, last_name, auth0 } =
      req.body;
    const newUser = await createUser(
      user_name,
      password,
      e_mail,
      first_name,
      last_name,
      auth0
    );

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = { postUserHandler };
