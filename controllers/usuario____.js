const { response } = require("express"); 

const usuarioGet = (req, res = response) => {
    res.json({
      msg: "GET API",
    });
  };
  
  const usuarioPost = (req, res = response) => {
    res.json({
      msg: "POST API",
    });
  };
  
  const usuarioPut = (req, res = response) => {
    res.json({
      msg: "PUT API",
    });
  };
  
  const usuarioDelete = (req, res = response) => {
    res.json({
      msg: "DELETE API",
    });
  };

  const confirmarPassword = (req, res = response) => {
    res.json({
      msg: "POST API CONFIRMAR PASSWORD",
    });
  };
  const recuperarPassword = (req, res = response) => {
    res.json({
      msg: "POST API RECUPERAR PASSWORD",
    });
  };
  const restablecerPassword = (req, res = response) => {
    res.json({
      msg: "POST API RESTABLECER PASSWORD",
    });
  };
  const usuarioUnico = (req, res = response) => {
    res.json({
      msg: "GET API OBTNER USUARIO",
    });
  };

  module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    confirmarPassword,
    recuperarPassword,
    restablecerPassword,
    usuarioUnico,
  };
