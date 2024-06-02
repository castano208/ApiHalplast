const express = require('express');
const router = express.Router();
const {
  enviosGet,
  enviosPost,
  enviosPut,
  enviosDelete,
  enviosCliente,
  todoEnviosCliente,
} = require('../controllers/envio');

router.get('/envios', enviosGet);

router.post('/envios', enviosPost);

router.put('/envios/:id_envio', enviosPut);

router.delete('/envios/:id_envio', enviosDelete);

router.get('/envios/:c_correo', enviosCliente);

router.get('/envios/terminados/:c_correo', todoEnviosCliente);

module.exports = router;
