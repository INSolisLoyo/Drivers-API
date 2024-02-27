const axios = require('axios');
const { Driver, Team } = require('../../db');
const { cleaner } = require('../../utils/dataUtils');
const ENDPOINT = 'http://localhost:5000/drivers';

const getDrivers = async () => {

    try {
        
        //Obtener todos los drivers creados en la base de datos
        //Obtenemos un arreglo
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

            const { id, forname, surname, description, image, nationality, dob} = elem;
            const teams = elem.Teams.map( (team) => team.name).join(', ');

            //por cada conductor de la base de datos retornamos un nuevo objeto con la propiedad teams convertida a string
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

        const apiDrivers = cleaner((await axios.get(ENDPOINT)).data);
        //retornamos una copia de cada arreglo
        return [ ...dbDrivers, ...apiDrivers];

    } catch (error) {

        console.error('Error retrieving drivers": ', error)
        throw error;

    }

}

module.exports = { getDrivers };