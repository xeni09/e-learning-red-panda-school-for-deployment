const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.cookies.token; // Extraer el token de las cookies

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token JWT
    req.user = decoded; // Adjuntar la información decodificada del usuario al request
    next(); // Continuar al siguiente middleware o controlador
  } catch (error) {
    res.status(401).send({ error: "Invalid token." }); // Cambia a 401
  }
};

module.exports = { auth };
