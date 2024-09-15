const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.cookies.token; // Extract the token from cookies

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded user info to the request
    next(); // Continue to the next middleware or controller
  } catch (error) {
    return res.status(401).send({ error: "Invalid token." });
  }
};

// Role-based authorization middleware
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    // Check if the user's role is allowed
    return res
      .status(403)
      .send({ error: "Access denied. You do not have the required role." });
  }
  next();
};

module.exports = { auth, authorize };
