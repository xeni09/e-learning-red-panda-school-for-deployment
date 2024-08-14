const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const envConfig = {
  jwtSecret: process.env.JWT_SECRET,
  mongodbUri: process.env.MONGODB_URI,
  port: process.env.PORT,
};

module.exports = envConfig;
