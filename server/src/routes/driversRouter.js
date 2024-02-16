const Router = require('express');
const driversRouter = Router();
const getDriversHandler = require('../handlers/drivers/driversHandler' );
const getDriverById = require('../handlers/drivers/getDriverByIdHandler');
const postDriverHandler = require('../handlers/drivers/postDriverHandler')

driversRouter.get('/', getDriversHandler);
driversRouter.get('/:id', getDriverById);
driversRouter.post('/', postDriverHandler);

module.exports = driversRouter;