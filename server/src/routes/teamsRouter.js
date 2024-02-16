const Router = require('express');
const teamsRouter = Router();
const { getTeamsHandler } = require('../handlers/teams/teamsHandler');

teamsRouter.get('/', getTeamsHandler);

module.exports = teamsRouter;