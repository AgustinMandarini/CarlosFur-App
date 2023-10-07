const { User } = require("../db");

const putUserController = async (id) => {
    // Busca el user por su id
    const user = await User.findByPk(id);
    let message = ""
    // Actualiza el atributo enabled_user a false
    
    if (user.enabled_user){
      user.enabled_user = false;
      message = "message: Usuario deshabilitado correctamente"
    } else {
      user.enabled_user = true;
      message = "message: Usuario habilitado correctamente"
    }
    await user.save();
      return message
    // Guarda los cambios en la base de datos
    
    
  }

module.exports = { putUserController };