const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estadoDescripcionSchema = new Schema({
  Envio: { type: Schema.Types.ObjectId, ref: 'Envio', required: true },
  EstadoEnvio: [
    {
      motivo: { type: String, required: true },
      descripcion: { type: String, default: 'Sin descripcion' },
      timestamp: { type: Date, default: Date.now }
    }
  ],
});

const EstadoDescripcion = mongoose.model('EstadoDescripcion', estadoDescripcionSchema);
module.exports = EstadoDescripcion;