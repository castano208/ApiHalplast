const { response } = require("express");

const chatPqrsGet = (req, res = response) => {
    res.json({
      msg: "GET API CHAT DE PQRS",
    });
  };
  
  const chatPqrsPost = (req, res = response) => {
    res.json({
      msg: "POST API CHAT DE PQRS",
    });
  };
  
  const chatPqrsDelete = (req, res = response) => {
    res.json({
      msg: "DELETE API MENSAJE CHAT DE PQRS",
    });
  };

  const finalizarChat = (req, res = response) => {
    res.json({
      msg: "DELETE API MENSAJES CHAT DE PQRS",
    });
  };
  
  const chatPqrsPostCrear = (req, res = response) => {
    res.json({
      msg: "POST API CREAR CHAT DE PQRS",
    });
  };

  module.exports = {
    chatPqrsGet,
    chatPqrsPost,
    chatPqrsDelete,
    finalizarChat,
    chatPqrsPostCrear,
  };