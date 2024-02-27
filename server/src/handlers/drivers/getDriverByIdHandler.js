const { driverById } = require('../../controllers/driversControllers/getDriverByIdController');

const getDriverById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await driverById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = getDriverById;