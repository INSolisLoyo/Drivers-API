const { Router } = require("express");
//importar routers
const driversRouter  = require('./driversRouter')
const teamsRouter = require('./teamsRouter');

const router = Router();

//configuración de routers
router.use('/drivers', driversRouter)
router.use('/teams', teamsRouter)

module.exports = router;
