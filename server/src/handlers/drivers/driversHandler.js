const { getDrivers } = require('../../controllers/driversControllers/getDriversController');
const { getDriverByName } = require('../../controllers/driversControllers/getDriverByNameController');

const getDriversHandler = async (req, res) => {
    //obtenemos name por query
    const { name } = req.query;

    try {
        //si existe un name enviado por query obtenemos un array de conductores
        if(name){
            const response = await getDriverByName(name)
            res.status(200).json(response);
        }else {
            //si no existe un name obtenemos todos los conductores
            const response = await getDrivers();
            res.status(200).json(response);
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error getting drivers' })
    }
}

module.exports = getDriversHandler;