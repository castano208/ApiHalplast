const { response } = require("express");
const SistemaChat = require('../modules/sistemaChat');
const Usuario = require('../modules/usuario');

const sistemaChatPqrsGet = async (req, res = response) => {
    try {
        const pqrs = await PQRS.find();
        res.json({ pqrs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al obtener PQRS' });
    }
};

const sistemaChatPqrsPut = async (req, res = response) => {
    try {
        const { id_ChatPqrs } = req.params;
        const { remitente, empleado, pqrs, fechas} = req.body;

        if (!remitente || !empleado || !pqrs || !fechas) {
            return res.status(400).json({ msg: 'Por favor, proporcione los datos completos' });
        }

        const chatPqrs = await SistemaChat.findOneAndUpdate({ _id: id_ChatPqrs }, { remitente, empleado, pqrs, fechas }, { new: true });

        if (!chatPqrs) {
            return res.status(404).json({ msg: 'chat de PQRS no encontrado' });
        }

        res.json({ msg: 'chat de PQRS actualizado exitosamente', pqrs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al actualizar el chat de PQRS' });
    }
};

const sistemaChatPqrsDelete = async (req, res = response) => {
    try {
        const { id_ChatPqrs } = req.params;
        const sistemaChat = await SistemaChat.findOneAndDelete({ _id: id_ChatPqrs });

        if (!sistemaChat) {
            return res.status(404).json({ msg: 'chat de PQRS no encontrado' });
        }

        res.json({ msg: 'chat de PQRS eliminado exitosamente', pqrs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al eliminar el chat de PQRS' });
    }
};

const agregarFechaChatPqrs = async (req, res = response) => {
    try {
        const { id_ChatPqrs } = req.params;
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ msg: 'Por favor, proporcione un estado' });
        }

        const chatPqrs = await SistemaChat.findById(id_ChatPqrs);

        if (!chatPqrs) {
            return res.status(404).json({ msg: 'Chat de PQRS no encontrado' });
        }
        const estadoExistente = chatPqrs.fechas.some(fecha => fecha.estado === estado);

        if (estadoExistente) {
            return res.status(400).json({ msg: 'El estado ya existe en el chat de PQRS' });
        }

        chatPqrs.fechas.push({ estado });

        await chatPqrs.save();

        res.json({ msg: 'Fecha agregada exitosamente', chatPqrs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al agregar la fecha al chat de PQRS' });
    }
};

module.exports = {
    sistemaChatPqrsGet,
    sistemaChatPqrsPut,
    sistemaChatPqrsDelete,
    agregarFechaChatPqrs
};