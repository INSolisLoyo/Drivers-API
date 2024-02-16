const cleaner =  (arr) => {

 return arr.map( (driver) => {
    
    return {
      id: driver.id,
      forname: driver.name.forename.replace(/–/g, "-"),
      surname: driver.name.surname.replace(/–/g, "-"),
      description: driver.description,
      image: driver.image.url,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams
    };
  })

};

module.exports = { cleaner };
