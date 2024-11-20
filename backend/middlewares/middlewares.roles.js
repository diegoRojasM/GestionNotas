// Middleware para verificar el rol del usuario
const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const { rol } = req.usuario; // Obtenemos el rol del usuario desde el token
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado. No tienes el rol adecuado.' });
    }
    next();
  };
};

module.exports = { verificarRol };
