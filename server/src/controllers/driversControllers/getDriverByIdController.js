const axios = require('axios');
const { Driver, Team } = require('../../db');
const { cleaner } = require('../../utils/dataUtils')

const ENDPOINT = 'http://localhost:5000/drivers';

const driverById = async (id, source) => {
    if( source === 'api'){
        const driversApi = cleaner((await axios.get(ENDPOINT)).data);
        const driver = driversApi.filter((driv) => driv.id.toString() === id);
        return driver;
    }
    else {
        const driverDb = await Driver.findByPk(id, {
            include: {
                model: Team,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

        return driverDb;
    }
}

module.exports = { driverById };