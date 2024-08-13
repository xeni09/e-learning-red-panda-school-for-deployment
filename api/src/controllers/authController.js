const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;

  // Verificar las credenciales del usuario de testeo
  if (
    username === process.env.TEST_USER_USERNAME &&
    password === process.env.TEST_USER_PASSWORD
  ) {
    const token = jwt.sign(
      { username: process.env.TEST_USER_USERNAME, role: "test" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).send({ error: "Invalid credentials" });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};

module.exports = {
  login,
  verifyToken,
};
