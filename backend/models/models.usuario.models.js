const mongoose = require('mongoose');

// Definimos el esquema de Usuario
const esquemaUsuario = new mongoose.Schema({
  nombre: { type: String, required: true }, // Nombre completo del usuario
  correo: { type: String, required: true, unique: true }, // Correo electrónico único
  contrasena: { type: String, required: true }, // Contraseña del usuario, se almacenará de forma encriptada
  rol: { 
    type: String, 
    enum: ['profesor', 'estudiante'], // El rol solo puede ser 'profesor' o 'estudiante'
    required: true 
  }
});

// Exportamos el modelo de Usuario
module.exports = mongoose.model('Usuario', esquemaUsuario);
