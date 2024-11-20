const express = require('express');
const { body } = require('express-validator');
const { verificarToken } = require('../middlewares/middlewares.autenticacion');
const { verificarRol } = require('../middlewares/middlewares.roles');
const { registrarNota, obtenerNotas, actualizarNota, eliminarNota } = require('../middlewares/middlewares.notas');
const { manejarValidacion } = require('../middlewares/middlewares.validacion');

const router = express.Router();

// Ruta para registrar una nueva nota (solo profesores)
router.post('/',
  verificarToken,
  verificarRol(['profesor']),
  [
    body('titulo').notEmpty().withMessage('El título es obligatorio.'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria.'),
    body('calificacion').isNumeric().withMessage('La calificación debe ser un número.'),
    body('estudiante').notEmpty().withMessage('El estudiante es obligatorio.')
  ],
  manejarValidacion,
  registrarNota
);

// Ruta para obtener notas (disponible para profesores y estudiantes)
router.get('/',
  verificarToken,
  obtenerNotas
);

// Ruta para actualizar una nota (solo profesores)
router.put('/:id',
  verificarToken,
  verificarRol(['profesor']),
  [
    body('titulo').optional().notEmpty().withMessage('El título no puede estar vacío.'),
    body('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía.'),
    body('calificacion').optional().isNumeric().withMessage('La calificación debe ser un número.')
  ],
  manejarValidacion,
  actualizarNota
);

// Ruta para eliminar una nota (solo profesores)
router.delete('/:id',
  verificarToken,
  verificarRol(['profesor']),
  eliminarNota
);

module.exports = router;
