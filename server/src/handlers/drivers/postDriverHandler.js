const createDriver = require('../../controllers/driversControllers/postDriverController')

const postDriverHandler = async (req, res) => {
    try {
        const { forname, surname, description, image, nationality, dob, teams } = req.body;
        const response = await createDriver(forname, surname, description, image, nationality, dob, teams)
        res.status(200).json(response);
        
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = postDriverHandler;