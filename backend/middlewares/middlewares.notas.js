const Nota = require('../models/models.nota.models'); // Modelo de Nota
const Usuario = require('../models/models.usuario.models'); // Modelo de Usuario

// Registrar una nueva nota (solo para profesores)
const registrarNota = async (req, res) => {
  try {
    const { titulo, descripcion, calificacion, estudiante } = req.body;

    // Verificar si el estudiante existe
    const estudianteExistente = await Usuario.findOne({ _id: estudiante, rol: 'estudiante' });
    if (!estudianteExistente) {
      return res.status(400).json({ mensaje: 'El estudiante no existe o no tiene el rol adecuado.' });
    }

    // Crear una nueva nota
    const nuevaNota = new Nota({
      titulo,
      descripcion,
      calificacion,
      estudiante,
      profesor: req.usuario.id // El profesor viene del token JWT
    });

    await nuevaNota.save();

    // Poblamos la nota recién creada para devolver los datos completos
    const notaGuardada = await Nota.findById(nuevaNota._id)
      .populate('estudiante', 'nombre correo')
      .populate('profesor', 'nombre correo');

    res.status(201).json({ mensaje: 'Nota registrada exitosamente.', nota: notaGuardada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar la nota.', error });
  }
};

// Obtener notas (diferente para estudiantes y profesores)
const obtenerNotas = async (req, res) => {
  try {
    const { rol, id } = req.usuario;

    let notas;
    if (rol === 'profesor') {
      // Si es profesor, puede ver todas las notas
      notas = await Nota.find()
        .populate('estudiante', 'nombre correo')
        .populate('profesor', 'nombre correo');
    } else if (rol === 'estudiante') {
      // Si es estudiante, solo puede ver sus propias notas
      notas = await Nota.find({ estudiante: id })
        .populate('profesor', 'nombre correo');
    } else {
      return res.status(403).json({ mensaje: 'Acceso denegado.' });
    }

    res.json(notas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las notas.', error });
  }
};

// Actualizar una nota (solo para profesores)
const actualizarNota = async (req, res) => {
  try {
    const { id } = req.params; // ID de la nota
    const { titulo, descripcion, calificacion } = req.body;

    const notaActualizada = await Nota.findByIdAndUpdate(
      id,
      { titulo, descripcion, calificacion },
      { new: true } // Retorna la nota actualizada
    ).populate('estudiante', 'nombre correo').populate('profesor', 'nombre correo'); // Popula los datos actualizados

    if (!notaActualizada) {
      return res.status(404).json({ mensaje: 'Nota no encontrada.' });
    }

    res.json({ mensaje: 'Nota actualizada exitosamente.', nota: notaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la nota.', error });
  }
};

// Eliminar una nota (solo para profesores)
const eliminarNota = async (req, res) => {
  try {
    const { id } = req.params; // ID de la nota

    const notaEliminada = await Nota.findByIdAndDelete(id);

    if (!notaEliminada) {
      return res.status(404).json({ mensaje: 'Nota no encontrada.' });
    }

    res.json({ mensaje: 'Nota eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la nota.', error });
  }
};

module.exports = { registrarNota, obtenerNotas, actualizarNota, eliminarNota };
