
const { Driver } = require('../../db');

const createDriver = async (forname, surname, description, image, nationality, dob, teams) => {
    try {
        const newDriver = await Driver.create({forname, surname, description, image, nationality, dob});
        newDriver.addTeams(teams);
        return newDriver;
    } catch (error) {
        console.error('Error creating driver');
        throw error;
    }
}

module.exports = createDriver;