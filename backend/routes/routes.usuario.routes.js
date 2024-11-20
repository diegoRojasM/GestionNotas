const express = require('express');
const { body } = require('express-validator');
const { registrarUsuario, iniciarSesion, obtenerEstudiantes } = require('../middlewares/middlewares.usuario');
const { manejarValidacion } = require('../middlewares/middlewares.validacion');
const { verificarToken } = require('../middlewares/middlewares.autenticacion'); // Middleware de autenticación
const Usuario = require('../models/models.usuario.models'); // Importa el modelo

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

// Nueva ruta: Obtener todos los estudiantes (solo profesores)
router.get('/estudiantes', verificarToken, obtenerEstudiantes);

// Ruta para obtener un usuario por ID
router.get('/:id', verificarToken, async (req, res) => {
  try {
      const usuario = await Usuario.findById(req.params.id).select('nombre correo');
      if (!usuario) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
      }
      res.json(usuario);
  } catch (error) {
      console.error('Error al obtener usuario:', error); // Log para depuración
      res.status(500).json({ mensaje: 'Error al obtener el usuario.', error });
  }
});

module.exports = router;
