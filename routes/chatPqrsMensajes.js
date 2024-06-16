const express = require('express');
const router = express.Router();
const {
    chatPqrsGet,
    chatPqrsPost,
    chatPqrsDelete,
    finalizarChat,
} = require('../controllers/ChatPqrs');

router.get('/chatPqrs/:id_chatMessage', chatPqrsGet);
router.post('/chatPqrs', chatPqrsPost);
router.delete('/chatPqrs', chatPqrsDelete);
router.delete('/finalizarChat', finalizarChat);

module.exports = router;
