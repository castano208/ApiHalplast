const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatMensajeSchema = new Schema({
  SistemaChat: { type: Schema.Types.ObjectId, ref: 'SistemaChat', required: true },
  mensajeCliente: [
    {
      mensaje: { type: String, required: true },
    }
  ],
  mensajeEmpleado: [
    {
      mensaje: { type: String, required: true },
    }
  ]
});

const ChatMensaje = mongoose.model('ChatMensaje', ChatMensajeSchema);
module.exports = ChatMensaje;