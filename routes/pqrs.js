const express = require('express');
const router = express.Router();
const {
  pqrsGet,
  pqrsPost,
  pqrsPut,
  pqrsDelete,
} = require('../controllers/pqrs');

// Ruta para obtener todos los envíos
router.get('/pqrs', pqrsGet);

// Ruta para crear un nuevo envío
router.post('/pqrs', pqrsPost);

// Ruta para actualizar un envío existente por su ID
router.put('/pqrs/:id_pqrs', pqrsPut);

// Ruta para eliminar un envío existente por su ID
router.delete('/pqrs/:id_pqrs', pqrsDelete);

module.exports = router; 
