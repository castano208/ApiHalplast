const { response } = require("express"); // Importa la función `response` desde el módulo express

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
  
  module.exports = {
    enviosGet,
    enviosPost,
    enviosPut,
    enviosDelete,
  };
