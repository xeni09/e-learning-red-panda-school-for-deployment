const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  console.log("Checking token in cookies", req.cookies);
  const token = req.cookies.token;
  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Token decoded successfully", decoded);
    next();
  } catch (error) {
    console.log("Invalid token", error.message);
    return res.status(401).send({ error: "Invalid token." });
  }
};

// Role-based authorization middleware
const authorize = (roles) => (req, res, next) => {
  console.log("User role:", req.user.role);
  if (!roles.includes(req.user.role)) {
    console.log("Access denied. Insufficient role");
    return res
      .status(403)
      .send({ error: "Access denied. You do not have the required role." });
  }
  next();
};

module.exports = { auth, authorize };
