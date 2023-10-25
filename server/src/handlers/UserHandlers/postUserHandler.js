//postUserHandler.js

const {
  createUser,
} = require("../../controllers/UserControllers/postUserController");

const postUserHandler = async (req, res) => {
  try {
    const {
      user_name,
      password,
      e_mail,
      first_name,
      last_name,
      phone,
      auth0,
      is_admin,
    } = req.body;
    const newUser = await createUser(
      user_name,
      password,
      e_mail,
      first_name,
      last_name,
      phone,
      auth0,
      is_admin
    );

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error);
  }
};
module.exports = { postUserHandler };
