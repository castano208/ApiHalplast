const { response } = require("express");

const sistemaChatPqrsGet = (req, res = response) => {
    res.json({
      msg: "GET API SISTEMA DE CHAT",
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

  const agregarFechaChatPqrs = (req, res = response) => {
    res.json({
      msg: "POST API AGREGAR ESTADO SISTEMA DE CHAT",
    });
  };

  const agregarEmpleadoChatPqrs = (req, res = response) => {
    res.json({
      msg: "POST API AGREGAR EMPLEADO SISTEMA DE CHAT",
    });
  };

  const ultimoEstadoChatPqrs = (req, res = response) => {
    res.json({
      msg: "GET API VER ULTIMO ESTADO DE UN CHAT PQRS",
    });
  };

  module.exports = {
    sistemaChatPqrsGet,
    agregarFechaChatPqrs,
    sistemaChatPqrsPut,
    sistemaChatPqrsDelete,
    agregarEmpleadoChatPqrs,
    ultimoEstadoChatPqrs,
  };
