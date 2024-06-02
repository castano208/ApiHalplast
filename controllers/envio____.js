const { response } = require("express");

const enviosGet = (req, res = response) => {
    res.json({
      msg: "GET API",
    });
  };
  
  const enviosPost = (req, res = response) => {
    res.json({
      msg: "POST API",
    });
  };
  
  const enviosPut = (req, res = response) => {
    res.json({
      msg: "PUT API",
    });
  };
  
  const enviosDelete = (req, res = response) => {
    res.json({
      msg: "DELETE API",
    });
  };

  const enviosCliente = (req, res = response) => {
    res.json({
      msg: "GET API PEDIDOS ASOCIADOS A UN CORREO QUE NO ESTEN TERMIANDOS",
    });
  };

  const todoEnviosCliente = (req, res = response) => {
    res.json({
      msg: "GET API PEDIDOS ASOCIADOS A UN CORREO",
    });
  };

  module.exports = {
    enviosGet,
    enviosPost,
    enviosPut,
    enviosDelete,
    enviosCliente,
    todoEnviosCliente,
  };
