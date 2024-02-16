const { driverById } = require('../../controllers/driversControllers/getDriverByIdController');

const getDriverById = async (req, res) => {
    const { id } = req.params;
    //Verifica si es NaN (Not a Number)
    const source = isNaN(id) ? 'db' : 'api';
    try {
        const response = await driverById(id, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = getDriverById;