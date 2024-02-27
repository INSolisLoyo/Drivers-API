const axios = require('axios');
const { Driver, Team } = require('../../db');
const { cleaner } = require('../../utils/dataUtils')

const ENDPOINT = 'http://localhost:5000/drivers';

const driverById = async (id) => {

    //veririfica si el id es numero o no es número para saber en qué fuente buscar
    const source = isNaN(id) ? 'db' : 'api';

    try {
        if( source === 'api'){
            //limpiamos la información proveniente de la API
            const driversApi = cleaner((await axios.get(ENDPOINT)).data);
            //filtramos los drivers para encontrar el driver con el id
            const driver = driversApi.find((driv) => driv.id.toString() === id);
            //retornamos el driver
            return driver;
        }
        else {
            //si el id isNaN: true buscamos en la base de datos
            const element = await Driver.findByPk(id, {
                include: {
                    model: Team,//incluimos teams relacionados al driver
                    attributes: ['name'],//incluimos atributo name
                    through: {//de la tabla intermedia no incluimos ningún valor
                        attributes: []
                    }
                }
            })

            //convertimos el array de objetos Teams en un string
            const teams = element.Teams.map( (team) => team.name).join(', ');
            //creamos el objeto y le añadimos teams
            const driverDb = {
                id: element.id,
                forname: element.forname,
                surname: element.surname,
                description: element.description,
                image: element.image,
                nationality: element.nationality,
                dob: element.dob,
                teams: teams
            }
    
            return driverDb;
        }
    } catch (error) {

        console.error('Error retrieving driver with id: ', id, ' .Error: ', error)
        throw error;

    }
    
}

module.exports = { driverById };