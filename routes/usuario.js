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

router.get('/usuarios', usuarioGet);

router.post('/usuarios', usuarioPost);

router.put('/usuarios/:id_usuario', usuarioPut);

router.delete('/usuarios/:id_usuario', usuarioDelete);

router.post('/usuarios/confirmarPassword', confirmarPassword);

router.post('/usuarios/recuperarPassword', recuperarPassword);

router.post('/usuarios/restablecerPassword', restablecerPassword);

router.get('/usuarios/:id_usuario', usuarioUnico);

module.exports = router; 
