const cleaner =  (arr) => {

 const DEFAULTIMAGE = 'https://cdn.pixabay.com/photo/2020/07/23/06/52/race-5430508_960_720.jpg';

 return arr.map( (driver) => {

    return {
      id: driver.id,
      forname: driver.name.forename.replace(/–/g, "-"),
      surname: driver.name.surname.replace(/–/g, "-"),
      description: driver.description,
      image: driver.image.url ? driver.image.url : DEFAULTIMAGE,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams
    };
  })

};

module.exports = { cleaner };
