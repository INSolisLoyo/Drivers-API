const axios = require('axios');
const { Sequelize, Op } = require('sequelize');
const { Driver, Team } = require('../../db');

const { cleaner } = require('../../utils/dataUtils');
const ENDPOINT = 'http://localhost:5000/drivers';

const getDriverByName = async (name) => {
    console.log(name);
    try {
        
        const database = await Driver.findAll({
            where: {
                [Op.or]: {
                    forname: {[Sequelize.Op.iLike]: `%${name}`,},
                    surname: {[Sequelize.Op.iLike]: `%${name}`,}
                }
            },
            include: {
                model: Team,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })


        const driversDb = database.map((elem) => {
            const { id, forname, surname, description, image, nationality, dob} = elem;
            const teams = elem.Teams.map( (team) => team.name).join(', ');

            return {
                id: id,
                forname: forname,
                surname: surname,
                description: description,
                image: image,
                nationality: nationality,
                dob: dob,
                teams: teams
            }

        })
        
        const response = cleaner((await axios.get(ENDPOINT)).data);
        
        const nameLowerCase = name.toLowerCase().trim().replace(/–/g, '-');
        console.log(nameLowerCase);

        const driversApi = response.filter( (driver) => {
            const forname = driver.forname.toLowerCase().replace(/–/g, '-');
            const surname = driver.surname.toLowerCase().replace(/–/g, '-');
            const fullName = forname + ' ' + surname;
            
            return fullName.includes(nameLowerCase) 
        })
        
        const allDrivers = [ ...driversDb, ...driversApi];

        return allDrivers.slice(0, 15);

    } catch (error) {

        console.error('Error finding drivers with name: ', name)
        throw error;

    }
}

module.exports = { getDriverByName };