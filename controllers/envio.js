const { response } = require("express");
const Envio = require('../modules/envio');

const enviosGet = async (req, res = response) => {
    try {
        const { q, nombre, page = 1, limit } = req.query; // Extrae los parámetros de la consulta
        const envios = await Envio.find(); // Consulta todos los documentos de la colección Envio
        res.json({
            envios, // Devuelve un objeto JSON con los envios obtenidos de la base de datos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los envíos' });
    }
};

const enviosPost = async (req, res) => {
    const { estadoEnvio, totalEnvio, direccionEnvio, correo, detalleVenta } = req.body;
    const nuevoEnvio = new Envio({ estadoEnvio, totalEnvio, direccionEnvio, correo, detalleVenta });
    try {
        await nuevoEnvio.save();
        res.json({ msg: 'Envío registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar el envío' });
    }
};

const enviosPut = async (req, res = response) => {
    try {
        const { id_envio } = req.params;
        const { estadoEnvio, totalEnvio, direccionEnvio, correo, detalleVenta } = req.body;
        const _id = id_envio;

        // Validación de datos de entrada
        if (!estadoEnvio || !totalEnvio || !direccionEnvio || !detalleVenta || !correo) {
            return res.status(400).json({ msg: 'Por favor, proporcione los datos completos' });
        }

        const envio = await Envio.findOneAndUpdate(
            { _id },
            { estadoEnvio, totalEnvio, direccionEnvio, correo, detalleVenta },
            { new: true }
        );

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
    const { id_envio } = req.params;
    try {
        const envio = await Envio.findByIdAndDelete(id_envio);
        if (!envio) {
            return res.status(404).json({ msg: 'Envio no encontrado' });
        }
        res.json({ msg: 'Envio eliminado exitosamente', envio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al eliminar envio' });
    }
};


const enviosCliente = async (req, res = response) => {
    const { c_correo } = req.params;

    // Verificar si el correo está presente
    if (!c_correo) {
        return res.status(400).json({ msg: 'El correo es requerido' });
    }

    try {
        // Realizar la búsqueda en la base de datos
        const envios = await Envio.find({ correo: c_correo, estadoEnvio: { $ne: "Terminado" } });

        // Verificar si se encontraron envíos
        if (envios.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron envíos para el correo proporcionado' });
        }

        // Devolver los envíos encontrados
        res.json({
            envios,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los envíos' });
    }
};

module.exports = {
    enviosGet,
    enviosPost,
    enviosPut,
    enviosDelete,
    enviosCliente
};
