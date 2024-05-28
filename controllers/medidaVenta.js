const { response } = require("express"); // Importa la función `response` desde el módulo express
// Importar modelos
const Envio = require('../modules/envio'); // Importa el modelo de Usuario desde el módulo '../modules/usuario'

// Controlador para la solicitud GET a la ruta de usuarios


const enviosGet = async (req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta
    const { q, nombre, page = 1, limit } = req.query; // Extrae los parámetros de la consulta
    const envios = await Envio.find(); // Consulta todos los documentos de la colección Usuario
    res.json({
        envios, // Devuelve un objeto JSON con los usuarios obtenidos de la base de datos
    });
};

// Controlador para la solicitud GET de promedio de usuarios
const PromGet = async (req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta
    const { q, nombre, page = 1, limit } = req.query; // Extrae los parámetros de la consulta
    const envios = await Envio.find(); // Consulta todos los documentos de la colección Usuario
    envios.forEach((numero) => console.log(numero)); // Muestra cada documento de usuario por consola
    res.json({
            msg: "Prom API controlador", // Devuelve un mensaje indicando que es el controlador del promedio
            q,
            nombre,
            page,
            limit,
            envios, // Devuelve los usuarios obtenidos de la base de datos
    });
};
const enviosPost = async (req, res) => {
    const { tipoDeEnvio, detalleEnvio, fechaEnvio, estadoDelEnvio, direccionEnvio, totalEnvio, estado } = req.body
    let msg = "";


    const nuevoEnvio = new Envio ({
        tipoDeEnvio,
        detalleEnvio,
        fechaEnvio,
        estadoDelEnvio,
        direccionEnvio,
        totalEnvio,
        estado
    });

    try {
        nuevoEnvio.save();
        msg = "Envío registrado correctamente";
    } catch (error) {
        console.error(error);
        msg = "Error al registrar el envío";
    }

    console.log(msg);
    res.json({ msg });
};

const enviosPut = async (req, res = response) => {
    try {
        const { id_envio } = req.params;
        const { tipoDeEnvio, detalleEnvio, fechaEnvio, estadoDelEnvio, dirreccionEnvio, totalEnvio } = req.body;
        const _id = id_envio
        // Validación de datos de entrada
        if (!tipoDeEnvio || !detalleEnvio || !fechaEnvio || !estadoDelEnvio || !dirreccionEnvio || !totalEnvio ) {
            return res.status(400).json({ msg: 'Por favor, proporcione los datos completos' });
        }

        const envio = await Envio.findOneAndUpdate({ _id }, { tipoDeEnvio, detalleEnvio, fechaEnvio, estadoDelEnvio, dirreccionEnvio, totalEnvio }, { new: true });

        if (!envio) {
            return res.status(404).json({ msg: 'Envio no encontrado' });
        }

        res.json({ msg: 'Envio actualizado exitosamente', envio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al actualizar envio' });
    }
};

const enviosDelete = async (req, res = response) => {
    try {
        const { id_envio } = req.params;
        const _id = id_envio
        const envio = await Envio.findOneAndDelete({ _id });
        
        if (!envio) {
            return res.status(404).json({ msg: 'Envio no encontrado' });
        }

        res.json({ msg: 'Envio eliminado exitosamente', envio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al eliminar envio' });
    }
};


// Exporta los controladores de las rutas de usuarios para que estén disponibles para otros módulos
module.exports = {
    enviosGet,
    enviosPost,
    enviosPut,
    enviosDelete,
    PromGet
};
