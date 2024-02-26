const axios = require('axios');
const { Driver, Team } = require('../../db');
const { cleaner } = require('../../utils/dataUtils');
const ENDPOINT = 'http://localhost:5000/drivers';

const getDrivers = async () => {

    const database = await Driver.findAll({
        include: {
            model: Team,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

    const dbDrivers = database.map((elem) => {
        const driver = {
            id: elem.id,
            forname: elem.forname,
            surname: elem.surname,
            description: elem.description,
            image: elem.image,
            nationality: elem.nationality,
            dob: elem.dob
        }

        driver.teams = elem.Teams.map( (team) => team.name).join(', ');

        return driver;
    })

    const apiDrivers = cleaner((await axios.get(ENDPOINT)).data);
    return [ ...dbDrivers, ...apiDrivers];
}

module.exports = { getDrivers };