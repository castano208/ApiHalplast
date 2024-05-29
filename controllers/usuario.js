const { response } = require("express");
const Usuario = require('../modules/usuario');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const usuarioGet = async (req, res = response) => {
    try {
        const usuarios = await Usuario.find();
        res.json({ usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al obtener usuarios' });
    }
};

const usuarioPost = async (req, res) => {
    const { nombre, password, correo, rol } = req.body;

    const nuevoUsuario = new Usuario({
        nombre,
        password,
        correo,
        rol
    });

    try {
        await nuevoUsuario.save();
        res.json({ msg: "Usuario registrado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al registrar el usuario" });
    }
};

const usuarioPut = async (req, res = response) => {
    try {
        const { id_usuario } = req.params;
        const { nombre, password, correo, rol } = req.body;

        if (!nombre || !password || !correo || !rol) {
            return res.status(400).json({ msg: 'Por favor, proporcione los datos completos' });
        }

        const usuario = await Usuario.findOneAndUpdate({ _id: id_usuario }, { nombre, password, correo, rol }, { new: true });

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json({ msg: 'Usuario actualizado exitosamente', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al actualizar usuario' });
    }
};

const usuarioDelete = async (req, res = response) => {
    try {
        const { id_usuario } = req.params;
        const usuario = await Usuario.findOneAndDelete({ _id: id_usuario });

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json({ msg: 'Usuario eliminado exitosamente', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al eliminar usuario' });
    }
};

// Función para confirmar contraseña
const confirmarPassword = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        if (usuario.password === password) {
            return res.json({ msg: 'Contraseña correcta' });
        } else {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al confirmar contraseña' });
    }
};

// Función para recuperar contraseña
const recuperarPassword = async (req, res = response) => {
    const { correo } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({ msg: 'Correo no encontrado' });
        }
    
        const codigoAcceso = crypto.randomBytes(4).toString('hex');
        usuario.codigoAcceso = codigoAcceso;
        await usuario.save();
    
        // Configurar el transporte de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'zsantiagohenao@gmail.com',
                pass: 'mpuc xxbc buhy gswb'
            }
        });
        const mailOptions = {
            from: 'zsantiagohenao@gmail.com',
            to: usuario.correo,
            subject: 'Recuperación de contraseña',
            text: `Su código de acceso es: ${codigoAcceso}`
        };

    
        // Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ msg: 'Error al enviar el correo' });
            } else {
                console.log('Correo enviado: ' + info.response);
                return res.json({ msg: 'Correo enviado correctamente' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al recuperar contraseña' });
    }    
};


const restablecerPassword = async (req, res = response) => {
    const { correo, codigoAcceso, nuevaPassword } = req.body;

    if (!correo || !codigoAcceso || !nuevaPassword) {
        return res.status(400).json({ msg: 'Por favor, proporcione todos los datos' });
    }

    try {
        const usuario = await Usuario.findOne({ correo, codigoAcceso });
        if (!usuario) {
            return res.status(404).json({ msg: 'Datos incorrectos' });
        }

        usuario.password = nuevaPassword;
        usuario.codigoAcceso = null;
        await usuario.save();

        return res.json({ msg: 'Contraseña restablecida correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al restablecer contraseña' });
    }
};

const usuarioUnico = async (req, res = response) => {
    try {
        const { c_correo } = req.params;
        const usuario = await Usuario.findOne({ correo : c_correo });

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            password: usuario.password,
            correo: usuario.correo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al buscar usuario' });
    }
};


module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    confirmarPassword,
    recuperarPassword,
    restablecerPassword,
    usuarioUnico,
}