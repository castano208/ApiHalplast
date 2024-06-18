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
  obtenerRolUsuarioApi,
} = require('../controllers/usuario');

router.get('/usuarios', usuarioGet);

router.get('/usuarios/:id_usuario', usuarioUnico);

router.get('/usuario/rol/:id_usuario', obtenerRolUsuarioApi);

router.post('/usuarios', usuarioPost);

router.post('/usuarios/confirmarPassword', confirmarPassword);

router.post('/usuarios/recuperarPassword', recuperarPassword);

router.post('/usuarios/restablecerPassword', restablecerPassword);

router.put('/usuarios/:id_usuario', usuarioPut);

router.delete('/usuarios/:id_usuario', usuarioDelete);

module.exports = router; 
