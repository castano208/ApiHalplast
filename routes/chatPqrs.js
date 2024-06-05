const express = require('express');
const router = express.Router();
const {
  sistemaChatPqrsGet,
  sistemaChatPqrsPut,
  sistemaChatPqrsDelete,
} = require('../controllers/sistemaChatPqrs');

router.get('/pqrs', sistemaChatPqrsGet);

router.put('/pqrs/:id_ChatPqrs', sistemaChatPqrsPut);

router.delete('/pqrs/:id_ChatPqrs', sistemaChatPqrsDelete);

module.exports = router; 
