const express = require('express');
const router = express.Router();
const {
  sistemaChatPqrsGet,
  sistemaChatPqrsPut,
  sistemaChatPqrsDelete,
  agregarFechaChatPqrs,
} = require('../controllers/sistemaChatPqrs');

router.get('/chatPqrs', sistemaChatPqrsGet);

router.post('/chatPqrs/:id_ChatPqrs', agregarFechaChatPqrs);

router.put('/chatPqrs/:id_ChatPqrs', sistemaChatPqrsPut);

router.delete('/chatPqrs/:id_ChatPqrs', sistemaChatPqrsDelete);

module.exports = router; 
