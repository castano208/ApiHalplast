const { response } = require("express");
const PQRS = require('../modules/pqrs');

const pqrsGet = async (req, res = response) => {
    try {
        const pqrs = await PQRS.find();
        res.json({ pqrs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al obtener PQRS' });
    }
};

const pqrsPost = async (req, res) => {
    const { remitente, tipo, motivo, descripcion } = req.body;

    const nuevaPQRS = new PQRS({
        remitente,
        tipo,
        motivo,
        descripcion
    });

    try {
        await nuevaPQRS.save();
        res.json({ msg: "PQRS registrado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al registrar la PQRS" });
    }
};

const pqrsPut = async (req, res = response) => {
    try {
        const { id_pqrs } = req.params;
        const { remitente, tipo, motivo, descripcion } = req.body;

        if (!remitente || !tipo || !motivo || !descripcion) {
            return res.status(400).json({ msg: 'Por favor, proporcione los datos completos' });
        }

        const pqrs = await PQRS.findOneAndUpdate({ _id: id_pqrs }, { remitente, tipo, motivo, descripcion }, { new: true });

        if (!pqrs) {
            return res.status(404).json({ msg: 'PQRS no encontrado' });
        }

        res.json({ msg: 'PQRS actualizado exitosamente', pqrs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al actualizar PQRS' });
    }
};

const pqrsDelete = async (req, res = response) => {
    try {
        const { id_pqrs } = req.params;
        const pqrs = await PQRS.findOneAndDelete({ _id: id_pqrs });

        if (!pqrs) {
            return res.status(404).json({ msg: 'PQRS no encontrado' });
        }

        res.json({ msg: 'PQRS eliminado exitosamente', pqrs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor al eliminar PQRS' });
    }
};

module.exports = {
    pqrsGet,
    pqrsPost,
    pqrsPut,
    pqrsDelete
};
