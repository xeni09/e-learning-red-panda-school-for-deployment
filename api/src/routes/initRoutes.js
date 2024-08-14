const authRoutes = require("./auth");
const userRoutes = require("./users");

const initRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
};

module.exports = initRoutes;
