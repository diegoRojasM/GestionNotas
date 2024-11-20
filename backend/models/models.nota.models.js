const mongoose = require('mongoose');

// Definimos el esquema de Nota
const esquemaNota = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  calificacion: { type: Number, required: true },
  estudiante: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  profesor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, {
  timestamps: true // Añade campos de fecha de creación y actualización automáticamente
});

// Exportamos el modelo de Nota
module.exports = mongoose.model('Nota', esquemaNota);
