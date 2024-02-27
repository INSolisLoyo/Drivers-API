
const { Driver } = require('../../db');

const createDriver = async (forname, surname, description, image, nationality, dob, teams) => {
    try {
        //creamos el driver 
        const newDriver = await Driver.create({forname, surname, description, image, nationality, dob});
        //añadimos teams como un arreglo de datos
        newDriver.addTeams(teams);
        //retornamos el nuevo driver
        return newDriver;
    } catch (error) {
        console.error('Error creating driver');
        throw error;
    }
}

module.exports = createDriver;