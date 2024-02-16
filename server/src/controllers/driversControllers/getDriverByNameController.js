const axios = require('axios');
const { Sequelize } = require('sequelize');
const { Driver, Team } = require('../../db');

const { cleaner } = require('../../utils/dataUtils');
const ENDPOINT = 'http://localhost:5000/drivers';

const getDriverByName = async (name) => {
    try {
        const driversDb = await Driver.findAll({
            where: {
                forname: {[Sequelize.Op.iLike]: `%${name}`,},
                surname: {[Sequelize.Op.iLike]: `%${name}`,}
            },
            include: {
                model: Team,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        
        const response = cleaner((await axios.get(ENDPOINT)).data);
        const driversApi = [];
        const nameLowerCase = name.toLowerCase().trim().replace(/ +/g, "");
        
        response.forEach( (driver) => {

            const fullName= driver.forname.toLowerCase() + driver.surname.toLowerCase();
            if (fullName.includes(nameLowerCase)) driversApi.push(driver);
        })
        const allDrivers = [ ...driversDb, ...driversApi];
        return allDrivers.slice(0, 15);


    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getDriverByName };