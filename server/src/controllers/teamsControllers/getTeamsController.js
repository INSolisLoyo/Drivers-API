const axios = require('axios');
const { Team } = require('../../db')

const ENDPOINT = 'http://localhost:5000/drivers';

const getTeams = async () => {

    try {

        //buscamos todos los Teams en la base de datos
        const existingTeams = await Team.findAll();
        //si ya existen Teams los retornamos
        if ( existingTeams.length > 0)
         return existingTeams;
    
        //Si no existen, obtener los drivers
        const response = ( await axios.get(ENDPOINT)).data
        
        //Estructura de datos que no repite elementos
        const uniqueTeams = new Set();
        //Almacenamos los Teams como objetos en el arreglo
        response.forEach( driver => {
            if(driver.teams) {
                //Por cada cada driver tomamos la cadena de Teams, la separamos en un nuevo arreglo, y por cada elemento quitamos espacios en blanco, y reemplazamos guión medio por guión normal
                const arr = driver.teams.split(',').map( elem => elem.trim().replace(/–/g, '-'));
                //Vamos agregando cada Team a la lista de Teams únicos
                arr.forEach( team => uniqueTeams.add(team))
            }    
        });
    
        //Convertimos el Set en un array donde cada arreglo se asigna a la propiedad nombre
        const teams = Array.from(uniqueTeams).map( nombre => ({
            name: nombre
        }))
    
        //Guardamos los Teams en la base de datos 
        await Team.bulkCreate(teams);
    
        //Retornamos los Teams creados
        return await Team.findAll();
        
    } catch (error) {
        console.error('Teams could not be retrieved');
        throw error;
    }

}

module.exports = { getTeams };