const userRouter = require("./UserRouter");

module.exports = (app) => {
  app.use("/users", userRouter);
};
