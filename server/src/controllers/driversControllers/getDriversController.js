const axios = require('axios');
const { Driver, Team } = require('../../db');
const { cleaner } = require('../../utils/dataUtils');
const ENDPOINT = 'http://localhost:5000/drivers';

const getDrivers = async () => {

    const dbDrivers = await Driver.findAll({
        include: {
            model: Team,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

    const apiDrivers = cleaner((await axios.get(ENDPOINT)).data);
    return [ ...dbDrivers, ...apiDrivers];
}

module.exports = { getDrivers };