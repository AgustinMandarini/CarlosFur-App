const { User } = require("../../db");

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();

    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteUser };