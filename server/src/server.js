const express = require("express");
const router = require("./routes");
//Middleware que permite obtener información detallada de las solicitudes HTTP entrantes
const morgan = require("morgan");
//Cross-Origin Resource Sharing (Compartir recursos entre diferentes orígenes)
//Permite recibir peticiones desde otros dominios
const cors = require("cors");

const server = express();

//dev formato predefinido de "registro" para desarrolladores que indica el tipo de información
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

// server.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));

server.use(router);

module.exports = server;
