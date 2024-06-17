const express = require('express');
const router = express.Router();
const {
  enviosGet,
  enviosPost,
  enviosPut,
  enviosDelete,
  enviosCliente,
  EnviosTerminadosCliente,
  EnviosDetalle,
  enviosModificarEstadoPost,
} = require('../controllers/envio');

router.get('/envios', enviosGet);

router.post('/envios', enviosPost);

router.post('/envios/estado/:id_envio', enviosModificarEstadoPost);

router.put('/envios/:id_envio', enviosPut);

router.delete('/envios/:id_envio', enviosDelete);

router.get('/envios/:c_correo', enviosCliente);

router.get('/envios/terminados/:c_correo', EnviosTerminadosCliente);

router.get('/envios/detalles/:id_envio', EnviosDetalle);

module.exports = router;
