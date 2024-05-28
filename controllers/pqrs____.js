const { response } = require("express"); // Importa la función `response` desde el módulo express

const pqrsGet = (req, res = response) => {
    res.json({
      msg: "GET API",
    });
  };
  
  const pqrsPost = (req, res = response) => {
    res.json({
      msg: "POST API",
    });
  };
  
  const pqrsPut = (req, res = response) => {
    res.json({
      msg: "PUT API",
    });
  };
  
  const pqrsDelete = (req, res = response) => {
    res.json({
      msg: "DELETE API",
    });
  };
  
  module.exports = {
    pqrsGet,
    pqrsPost,
    pqrsPut,
    pqrsDelete,
  };
