// const { deleteProduct} = require('../../controllers/ProductController/deleteProductController')


// const deleteProductHandler = async (req, res) => {
//   try {
//     const result = await deleteProduct(req);
//     if (result.status === 204) {
//       res.status(204).send();
//     } else {
//       res.status(result.status).json(result.data);
//     }
//   } catch (error) {
//     console.error('Error in deleteProductHandler:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { deleteProductHandler }
