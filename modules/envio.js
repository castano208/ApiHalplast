const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detalleVentaSchema = new Schema({
  fechaVenta: { type: Date, required: true },
  medidaVenta: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad: { type: Number, required: true },
  color: { type: String, required: true }
});

const envioSchema = new Schema({
  estadoEnvio: { type: String, required: true },
  totalEnvio: { type: Number, required: true },
  direccionEnvio: { type: String, required: true },
  correo: { type: String, required: true },
  detalleVenta: [detalleVentaSchema]
});

const Envio = mongoose.model('Envio', envioSchema);
module.exports = Envio;