const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; // Utiliza el puerto 3000 si no se especifica uno en las variables de entorno
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
        // Configura express.static para servir archivos estáticos
        this.app.use(express.static(__dirname + "/public"));
    }

    routes() {
        this.app.use(this.enviosPath, require("../routes/envio"));
        this.app.use(this.enviosPath, require("../routes/usuario"));
        this.app.use(this.enviosPath, require("../routes/pqrs"));
    }    

    async connectDb() {
        try {
            await dbConnection();
            console.log('Conexión a la base de datos exitosa');
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            // Aquí podrías manejar el error de conexión de forma más adecuada, como cerrar el servidor
            process.exit(1);
        }
    }
}

module.exports = Server;