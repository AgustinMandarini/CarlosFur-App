const { findAllProducts } = require("../controllers/getProductController");

const getProductHandler = async (req, res) => {
  try {
    const { name, orderBy, orderDirection } = req.query;
    const products = await findAllProducts(name, orderBy, orderDirection);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const findFilteredAndSortedProducts = async (req, res) => {
//   console.log(req.query);
//   try {
//     // Obtener parámetros de consulta de la URL
//     const { name, orderBy, orderDirection } = req.query;

//     // Llamar a la función filterAndSortProducts con los parámetros de consulta
//     const products = await filterAndSortProducts(name, orderBy, orderDirection);

//     // Enviar la respuesta con los productos
//     res.status(200).send(products);
//   } catch (error) {
//     // Manejar errores y enviar una respuesta de error
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = { getProductHandler };
