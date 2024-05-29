const express = require('express');
const router = express.Router();
const {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  confirmarPassword,
  recuperarPassword,
  restablecerPassword,
  usuarioUnico,
} = require('../controllers/usuario');

// Ruta para obtener todos los envíos
router.get('/usuarios', usuarioGet);

// Ruta para crear un nuevo envío
router.post('/usuarios', usuarioPost);

// Ruta para actualizar un envío existente por su ID
router.put('/usuarios/:id_usuario', usuarioPut);

// Ruta para eliminar un envío existente por su ID
router.delete('/usuarios/:id_usuario', usuarioDelete);

router.post('/usuarios/confirmarPassword', confirmarPassword);

router.post('/usuarios/recuperarPassword', recuperarPassword);

router.post('/usuarios/restablecerPassword', restablecerPassword);

router.post('/usuarios/:id_usuario', usuarioUnico);

module.exports = router; 
