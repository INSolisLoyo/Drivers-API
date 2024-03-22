const axios = require('axios');
const { Team } = require('../../db')

const ENDPOINT = 'http://localhost:5000/drivers';

const getTeams = async () => {

    try {

        const existingTeams = await Team.findAll();
        if ( existingTeams.length > 0)
         return existingTeams;
    
        const response = ( await axios.get(ENDPOINT)).data
        
        const uniqueTeams = new Set();
        response.forEach( driver => {
            if(driver.teams) {
                
                const arr = driver.teams.split(',').map( elem => elem.trim().replace(/–/g, '-'));
                arr.forEach( team => uniqueTeams.add(team))
            }    
        });
    
        const teams = Array.from(uniqueTeams).map( nombre => ({
            name: nombre
        }))
    
        await Team.bulkCreate(teams);
    
        return await Team.findAll();
        
    } catch (error) {
        console.error('Teams could not be retrieved');
        throw error;
    }

}

module.exports = { getTeams };