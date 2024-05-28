const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema para el modelo de Permiso
const permisoSchema = new Schema({
    nombrePermiso: {
        type: String,
        required: true
    }
});

// Esquema para el modelo de Usuario
const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    codigoAcceso: {
        type: String // Agregar el campo para el código de acceso
    },
    rol: {
        permisos: [permisoSchema], // Campo embebido para los permisos del rol
        extraPorcentaje: {
            type: Number,
            required: true
        }
    }
});

// Modelo de Usuario basado en el esquema anterior
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
