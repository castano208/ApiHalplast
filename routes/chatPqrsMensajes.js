const express = require('express');
const router = express.Router();
const {
    chatPqrsGet,
    chatPqrsPost,
    chatPqrsDelete,
    finalizarChat,
    chatPqrsPostCrear,
} = require('../controllers/ChatPqrs');

router.get('/chatPqrs/:id_SistemaChat', chatPqrsGet);
router.post('/chatPqrs/:id_SistemaChat', chatPqrsPost);
router.post('/chatPqrs/crear/:id_SistemaChat', chatPqrsPostCrear);

router.delete('/chatPqrs', chatPqrsDelete);
router.delete('/finalizarChat', finalizarChat);

module.exports = router;
