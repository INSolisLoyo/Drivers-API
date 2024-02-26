const { getDrivers } = require('../../controllers/driversControllers/getDriversController');
const { getDriverByName } = require('../../controllers/driversControllers/getDriverByNameController');

const getDriversHandler = async (req, res) => {
    const { name } = req.query;

    try {

        if(name){
            const response = await getDriverByName(name)
            res.status(200).json(response);
        }else {
            const response = await getDrivers();
            res.status(200).json(response);
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message })
    }
}

module.exports = getDriversHandler;