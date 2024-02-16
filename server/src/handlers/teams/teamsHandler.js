const { getTeams } = require('../../controllers/teamsControllers/getTeamsController');

const getTeamsHandler = async (req, res) => {
    
    try {
        
        const teams = await getTeams();
        res.status(200).json(teams);
       
    } catch (error) {
            res.status(400).json({ error: error.message });
    }
};

module.exports = { getTeamsHandler }