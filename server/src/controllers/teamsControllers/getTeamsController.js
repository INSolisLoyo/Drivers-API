const axios = require('axios');
const { Team } = require('../../db')

const ENDPOINT = 'http://localhost:5000/drivers';

const getTeams = async () => {
    const existingTeams = await Team.findAll();
    if ( existingTeams.length > 0)
     return existingTeams;

    //Si no existen, obtener los drivers
    const response = ( await axios.get(ENDPOINT)).data
    
    //Estructura de datos que no repite elementos
    const uniqueTeams = new Set();
    //Almacenamos los Teams como objetos en el arreglo
    response.forEach( driver => {
        if(driver.teams) {
            const arr = driver.teams.split(',').map( elem => elem.trim().replace(/–/g, '-'));
            arr.forEach( team => uniqueTeams.add(team))
        }    
    });

    const teams = Array.from(uniqueTeams).map( nombre => ({
        name: nombre
    }))

    //Guardar los teams en la base de datos 
    await Team.bulkCreate(teams);

    return await Team.findAll();

}

module.exports = { getTeams };