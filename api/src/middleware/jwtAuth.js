const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Invalid token", error.message);
    return res.status(401).send({ error: "Invalid token." });
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!req.user || !req.user.role) {
    console.log("No role found in req.user");
    return res.status(403).send({ error: "Access denied. Role not found." });
  }
  if (!roles.includes(req.user.role)) {
    console.log(`Access denied. Role: ${req.user.role} is not sufficient`);
    return res
      .status(403)
      .send({ error: "Access denied. You do not have the required role." });
  }
  next();
};

module.exports = { auth, authorize };
