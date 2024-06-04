const { response } = require("express");

const tipoPqrsGet = (req, res = response) => {
    res.json({
      msg: "GET API TIPO DE PQRS",
    });
  };
  
  const tipoPqrsPost = (req, res = response) => {
    res.json({
      msg: "POST API TIPO DE PQRS",
    });
  };
  
  const tipoPqrsPut = (req, res = response) => {
    res.json({
      msg: "PUT API TIPO DE PQRS",
    });
  };
  
  const tipoPqrsDelete = (req, res = response) => {
    res.json({
      msg: "DELETE API TIPO DE PQRS",
    });
  };
  
  module.exports = {
    tipoPqrsGet,
    tipoPqrsPost,
    tipoPqrsPut,
    tipoPqrsDelete,
  };
