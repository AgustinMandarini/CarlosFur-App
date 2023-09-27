const {
  getAllTypes,
} = require("../controllers/getProductTypeController.js");


const getProductTypeHandler=async(req, res)=>{
  try {
    const allTypes=await getAllTypes();
    res.status(200).json(allTypes)
  } catch (error) {
      res.statu(400).json({error: error.message})
  }
}


module.exports = {
  getProductTypeHandler,
};


