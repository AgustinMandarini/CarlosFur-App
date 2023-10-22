const { deleteUser } = require("../../controllers/UserControllers/deleteUserController");

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params; 

    const result = await deleteUser(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error handling delete user request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteUserHandler };