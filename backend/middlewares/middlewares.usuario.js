const Usuario = require('../models/models.usuario.models'); // Modelo de Usuario
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para generar tokens JWT

// Registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    // Verificar si el correo ya está registrado
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }

    // Encriptar la contraseña
    const hashContrasena = await bcrypt.hash(contrasena, 10);

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({ nombre, correo, contrasena: hashContrasena, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario.', error });
  }
};

// Iniciar sesión
const iniciarSesion = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Buscar al usuario por correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
    }

    // Verificar la contraseña
    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas.' });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol, nombre: usuario.nombre }, // Incluye el nombre
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token válido por 1 hora
    );

    res.json({ token, mensaje: 'Inicio de sesión exitoso.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión.', error });
  }
};

// Obtener todos los estudiantes
const obtenerEstudiantes = async (req, res) => {
  try {
      const estudiantes = await Usuario.find({ rol: 'estudiante' }).select('-contrasena'); // Excluye la contraseña
      res.json(estudiantes);
  } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener estudiantes', error });
  }
};


module.exports = { registrarUsuario, iniciarSesion, obtenerEstudiantes  };
