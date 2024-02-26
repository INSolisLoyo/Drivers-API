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
        const element = await Driver.findByPk(id, {
            include: {
                model: Team,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

        const driverDb = {
            id: element.id,
            forname: element.forname,
            surname: element.surname,
            description: element.description,
            image: element.image,
            nationality: element.nationality,
            dob: element.dob
        }

        driverDb.teams = element.Teams.map( (team) => team.name).join(', ');

        return [driverDb];
    }
}

module.exports = { driverById };