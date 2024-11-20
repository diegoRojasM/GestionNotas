const { validationResult } = require('express-validator');

// Middleware para manejar validaciones de datos
const manejarValidacion = (req, res, next) => {
  const errores = validationResult(req); // Validamos los datos de la solicitud
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

module.exports = { manejarValidacion };
