const { getMueblesControllers} =  require("../controllers/mueblesControllers.js");

const  getMueblesHandlers = async (req, res) => {
    try {
        const muebles = await getMueblesControllers();
        res.status(200).send(muebles)
    } catch (error) {
        res.status(400).json({error: error.mesagge})
    }
}



module.exports = {
    getMueblesHandlers
}