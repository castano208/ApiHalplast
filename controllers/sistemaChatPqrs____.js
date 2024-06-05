const { response } = require("express");

const sistemaChatPqrsGet = (req, res = response) => {
    res.json({
      msg: "GET API SISTEMA DE CHAT",
    });
  };
  
  const sistemaChatPqrsPost = (req, res = response) => {
    res.json({
      msg: "POST API SISTEMA DE CHAT",
    });
  };
  
  const sistemaChatPqrsPut = (req, res = response) => {
    res.json({
      msg: "PUT API SISTEMA DE CHAT",
    });
  };
  
  const sistemaChatPqrsDelete = (req, res = response) => {
    res.json({
      msg: "DELETE API SISTEMA DE CHAT",
    });
  };
  
  module.exports = {
    sistemaChatPqrsGet,
    sistemaChatPqrsPost,
    sistemaChatPqrsPut,
    sistemaChatPqrsDelete,
  };
