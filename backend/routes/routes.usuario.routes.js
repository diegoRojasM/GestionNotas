const express = require('express');
const { body } = require('express-validator');
const { registrarUsuario, iniciarSesion } = require('../middlewares/middlewares.usuario');
const { manejarValidacion } = require('../middlewares/middlewares.validacion');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/registro', 
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
    body('correo').isEmail().withMessage('Debe ser un correo válido.'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('rol').isIn(['profesor', 'estudiante']).withMessage('El rol debe ser profesor o estudiante.')
  ],
  manejarValidacion,
  registrarUsuario
);

// Ruta para iniciar sesión
router.post('/login', 
  [
    body('correo').isEmail().withMessage('Debe ser un correo válido.'),
    body('contrasena').notEmpty().withMessage('La contraseña es obligatoria.')
  ],
  manejarValidacion,
  iniciarSesion
);

module.exports = router;
