const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.enviosPath = "/api";
        this.middlewares();
        this.routes();
        this.connectDb();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.static(__dirname + "/public"));
    }

    routes() {
        this.app.use(this.enviosPath, require("../routes/envio"));
        this.app.use(this.enviosPath, require("../routes/usuario"));
        this.app.use(this.enviosPath, require("../routes/pqrs"));
        this.app.use(this.enviosPath, require("../routes/tipoPqrs"));
        this.app.use(this.enviosPath, require("../routes/chatPqrs"));
    }    

    async connectDb() {
        try {
            await dbConnection();
            console.log('Conexión a la base de datos exitosa');
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            process.exit(1);
        }
    }
}

module.exports = Server;