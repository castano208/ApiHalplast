const { response } = require("express");
const Envio = require('../modules/envio');
const EstadoEnvio = require('../modules/estadoEnvio');

const enviosGet = async (req, res = response) => {
    try {
        const { q, nombre, page = 1, limit } = req.query; 
        const envios = await Envio.find(); 
        res.json({
            envios, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los envíos' });
    }
};

const enviosPost = async (req, res) => {
    const { estadoEnvio, totalEnvio, direccionEnvio, correo, fechaEntrega, detalleVenta } = req.body;
    const nuevoEnvio = new Envio({ estadoEnvio, totalEnvio, direccionEnvio, correo, fechaEntrega, detalleVenta });
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
        const { estadoEnvio, totalEnvio, direccionEnvio, correo, fechaEntrega, detalleVenta } = req.body;
        const _id = id_envio;

        if (!estadoEnvio || !totalEnvio || !direccionEnvio || !detalleVenta || !correo ||  !fechaEntrega) {
            return res.status(400).json({ msg: 'Por favor, proporcione los datos completos' });
        }

        const envio = await Envio.findOneAndUpdate(
            { _id },
            { estadoEnvio, totalEnvio, direccionEnvio, correo, fechaEntrega, detalleVenta },
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
    if (!c_correo) {
        return res.status(400).json({ msg: 'El correo es requerido' });
    }
    try {
        const envios = await Envio.find({ correo: c_correo, estadoEnvio: { $ne: "Terminado" } });
        if (envios.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron envíos para el correo proporcionado' });
        }
        res.json({
            envios,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los envíos' });
    }
};

const EnviosTerminadosCliente = async (req, res = response) => {
    const { c_correo } = req.params;
    if (!c_correo) {
        return res.status(400).json({ msg: 'El correo es requerido' });
    }
    try {
        const envios = await Envio.find({ correo: c_correo, estadoEnvio: "Terminado" });
        if (envios.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron envíos para el correo proporcionado' });
        }
        res.json({
            envios,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los envíos' });
    }
};

const EnviosDetalle = async (req, res = response) => {
    const { id_envio } = req.params;
    if (!id_envio) {
        return res.status(400).json({ msg: 'El id es requerido' });
    }
    try {
        const envio = await Envio.findById(id_envio).select('estadoEnvio totalEnvio direccionEnvio correo fechaEntrega detalleVenta');
        if (!envio) {
            return res.status(404).json({ msg: 'No se encontraron envíos para el id proporcionado' });
        }
        res.json(envio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los detalles del envio' });
    }
};

const enviosModificarEstadoPost = async (req, res) => {
    const { id_envio } = req.params;
    const { estadoEnvio, EstadoEnvioDescripcion } = req.body;
  
    try {
      const envio = await Envio.findOneAndUpdate(
        { _id: id_envio },
        { estadoEnvio },
        { new: true }
      );
  
      if (!envio) {
        return res.status(404).json({ msg: 'Envío no encontrado' });
      }
  
  
      res.json({ msg: 'Estado de envío actualizado correctamente', envio });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al cambiar el estado de un envío' });
    }
  };

module.exports = {
    enviosGet,
    enviosPost,
    enviosPut,
    enviosDelete,
    enviosCliente,
    EnviosTerminadosCliente,
    EnviosDetalle,
    enviosModificarEstadoPost,
};
