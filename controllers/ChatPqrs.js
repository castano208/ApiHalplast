const ChatMensaje = require('../modules/chatMensaje');
const Usuario = require('../modules/usuario');

const chatPqrsGet = async (req, res) => {
    try {
        const messages = await ChatMensaje.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const chatPqrsPost = async (req, res) => {
    const { sistemaChatId, mensaje, id_usuario } = req.body;
    try {
        const chatMensaje = await ChatMensaje.findOne({ SistemaChat: sistemaChatId });

        const usuarioCliente = await Usuario.findOne({
            _id: id_usuario, 'rol.permisos.nombrePermiso': 'cliente'
        });

        const usuarioEmpleado = await Usuario.findOne({
            _id: id_usuario, 'rol.permisos.nombrePermiso': 'empleado'
        });

        if (!chatMensaje) {
            return res.status(404).json({ message: "Chat no encontrado" });
        }

        if (!(usuarioCliente || usuarioEmpleado)) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (usuarioCliente) {
            chatMensaje.mensajeCliente.push({ mensaje });
        } else if (usuarioEmpleado) {
            chatMensaje.mensajeEmpleado.push({ mensaje });
        } else {
            return res.status(400).json({ message: "Tipo de mensaje no válido" });
        }

        await chatMensaje.save();
        res.status(201).json(chatMensaje);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const chatPqrsDelete = async (req, res) => {
    const { sistemaChatId, mensajeId, id_usuario } = req.body; // Cambié "id_usario" a "id_usuario" para coincidir con el nombre correcto
    try {
        const chatMensaje = await ChatMensaje.findOne({ SistemaChat: sistemaChatId });

        const usuarioCliente = await Usuario.findOne({
            _id: id_usuario, 'rol.permisos.nombrePermiso': 'cliente'
        });

        const usuarioEmpleado = await Usuario.findOne({
            _id: id_usuario, 'rol.permisos.nombrePermiso': 'empleado'
        });

        if (!chatMensaje) {
            return res.status(404).json({ message: "Chat no encontrado" });
        }

        if (!(usuarioCliente || usuarioEmpleado)) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (usuarioCliente) {
            chatMensaje.mensajeCliente.id(mensajeId).remove();
        } else if (usuarioEmpleado) {
            chatMensaje.mensajeEmpleado.id(mensajeId).remove();
        }

        await chatMensaje.save();
        res.status(200).json({ message: "Mensaje eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const finalizarChat = async (req, res) => {
    const { sistemaChatId } = req.body;
    try {
        const chatMensaje = await ChatMensaje.findOne({ SistemaChat: sistemaChatId });
        if (!chatMensaje) {
            return res.status(404).json({ message: "Chat no encontrado" });
        }

        chatMensaje.mensajeCliente = [];
        chatMensaje.mensajeEmpleado = [];

        await chatMensaje.save();
        res.status(200).json({ message: "Chat finalizado y mensajes eliminados" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    chatPqrsGet,
    chatPqrsPost,
    chatPqrsDelete,
    finalizarChat,
};
