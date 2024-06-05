const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sistemaChatSchema = new Schema({
  cliente: { type: String, required: true },
  empleado: { type: String, default: "null"},
  pqrs: { type: String, required: true },
  estado: { type: String, required: true },
  fechaChat: { type: Date, default: Date.now },
});

const SistemaChat = mongoose.model('SistemaChat', sistemaChatSchema);
module.exports = SistemaChat;