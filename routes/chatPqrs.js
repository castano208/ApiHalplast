const express = require('express');
const router = express.Router();
const {
  sistemaChatPqrsGet,
  sistemaChatPqrsPut,
  sistemaChatPqrsDelete,
} = require('../controllers/sistemaChatPqrs');

router.get('/chatPqrs', sistemaChatPqrsGet);

router.put('/chatPqrs/:id_ChatPqrs', sistemaChatPqrsPut);

router.delete('/chatPqrs/:id_ChatPqrs', sistemaChatPqrsDelete);

module.exports = router; 
