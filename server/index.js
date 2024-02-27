const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;

//sync: sincroniza la base de datos con los modelos creados
//force: true, cada vez que el servidor se reinicie, la base de datos se reestablecerá
conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
