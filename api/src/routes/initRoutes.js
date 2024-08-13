const authRoutes = require("./AuthRouter");
const userRoutes = require("./UserRouter");

const initRoutes = (app) => {
  app.use(authRoutes);
  app.use(userRoutes);
};

module.exports = initRoutes;
