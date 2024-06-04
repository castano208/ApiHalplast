const express = require('express');
const router = express.Router();
const {
  tipoPqrsGet,
  tipoPqrsPost,
  tipoPqrsPut,
  tipoPqrsDelete,
} = require('../controllers/tipoPqrs');

router.get('/tipoPqrs', tipoPqrsGet);

router.post('/tipoPqrs', tipoPqrsPost);

router.put('/tipoPqrs/:id_pqrs', tipoPqrsPut);

router.delete('/tipoPqrs/:id_pqrs', tipoPqrsDelete);

module.exports = router; 
