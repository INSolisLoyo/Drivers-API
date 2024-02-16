
const { Driver } = require('../../db');

const createDriver = async (forname, surname, description, image, nationality, dob, teams) => {
    const newDriver = await Driver.create({forname, surname, description, image, nationality, dob});
    newDriver.addTeams(teams);
    return newDriver;
}

module.exports = createDriver;