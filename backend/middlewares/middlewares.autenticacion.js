const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtenemos el token del encabezado
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Verificamos el token con el secreto
    req.usuario = payload; // Guardamos los datos del usuario en la solicitud
    next();
  } catch (error) {
    res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = { verificarToken };
