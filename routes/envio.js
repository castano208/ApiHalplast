const express = require('express');
const router = express.Router();
const {
  enviosGet,
  enviosPost,
  enviosPut,
  enviosDelete,
  enviosCliente,
} = require('../controllers/envio');

// Ruta para obtener todos los envíos
router.get('/envios', enviosGet);

// Ruta para crear un nuevo envío
router.post('/envios', enviosPost);

// Ruta para actualizar un envío existente por su ID
router.put('/envios/:id_envio', enviosPut);

router.delete('/envios/:id_envio', enviosDelete);

router.get('/envios/:c_correo', enviosCliente);

module.exports = router;
