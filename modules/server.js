const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });

        this.enviosPath = "/api";
        
        this.middlewares();
        this.routes();
        this.connectDb();
        this.configureWebSocket();
    }

    listen() {
        this.server.listen(this.port, () => {
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
        this.app.use(this.enviosPath, require("../routes/chatPqrsMensajes"));
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

    configureWebSocket() {
        this.wss.on('connection', (ws) => {
            console.log('Nuevo cliente conectado');
    
            ws.on('message', (message) => {
                console.log(`Mensaje recibido: ${message}`);
    
                // Aquí puedes procesar el mensaje y enviarlo a todos los clientes
                this.wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            });
    
            ws.on('close', () => {
                console.log('Cliente desconectado');
            });
        });
    }    
}

module.exports = Server;
