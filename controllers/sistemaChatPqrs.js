const { response } = require("express");
const SistemaChat = require('../modules/sistemaChat');
const Usuario = require('../modules/usuario');
const nodemailer = require('nodemailer');

const sistemaChatPqrsGet = async (req, res = response) => {
    try {
        const sistemaChat = await SistemaChat.find();
        res.json({ sistemaChat });
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

        res.json({ msg: 'chat de PQRS actualizado exitosamente'});
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

        res.json({ msg: 'chat de PQRS eliminado exitosamente'});
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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'zsantiagohenao@gmail.com',
                pass: 'mpuc xxbc buhy gswb'
            }
        });
        const mailOptions = {
            from: 'zsantiagohenao@gmail.com',
            to: chatPqrs.cliente,
            subject: 'Estado chat PQRS Halplast',
            text: `Su chat se encuentra actualmente en estado de: ${estado}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ msg: 'Error al enviar el correo' });
            } else {
                console.log('Correo enviado: ' + info.response);
                return res.json({ msg: 'Correo enviado correctamente'});
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al agregar la fecha al chat de PQRS' });
    }
};

const agregarEmpleadoChatPqrs = async (req, res = response) => {
    try {
        const { id_ChatPqrs } = req.params;
        const { empleado } = req.body;

        if (!empleado) {
            return res.status(400).json({ msg: 'Por favor, proporcione un empleado' });
        }

        const chatPqrs = await SistemaChat.findById(id_ChatPqrs);

        if (!chatPqrs) {
            return res.status(404).json({ msg: 'Chat de PQRS no encontrado' });
        }

        chatPqrs.empleado = empleado;

        await chatPqrs.save();
        const estado = "Activo";

        const agregarFechaReq = {
            params: { id_ChatPqrs },
            body: { estado }
        };

        await agregarFechaChatPqrs(agregarFechaReq, res);

        res.json({ msg: 'Empleado agregado exitosamente'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al agregar el empleado al chat de PQRS' });
    }
};

const ultimoEstadoChatPqrs = async (req, res = response) => {
    try {
        const { id_ChatPqrs } = req.params;

        const chatPqrs = await SistemaChat.findById(id_ChatPqrs);

        if (!chatPqrs) {
            return res.status(404).json({ msg: 'Chat de PQRS no encontrado' });
        }

        const ultimoEstado = chatPqrs.fechas.slice(-1)[0];

        res.json({ estado: ultimoEstado.estado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al obtener el ultimo estado de un chat de PQRS' });
    }
};


const SistemaChatPqrsGetUnico = async (req, res = response) => {
    try {
        const { id_Usuario } = req.params;

        const usuario = await Usuario.findById(id_Usuario);

        const chatPqrs = await SistemaChat.findOne({ cliente: usuario.correo });

        if (!chatPqrs) {
            return res.status(404).json({ msg: 'Chat de PQRS no encontrado' });
        }

        res.json(chatPqrs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al obtener el ultimo estado de un chat de PQRS' });
    }
};

module.exports = {
    sistemaChatPqrsGet,
    sistemaChatPqrsPut,
    sistemaChatPqrsDelete,
    agregarFechaChatPqrs,
    agregarEmpleadoChatPqrs,
    ultimoEstadoChatPqrs,
    SistemaChatPqrsGetUnico
};