//to use this script run: node generateSecrets.js

const crypto = require("crypto");

function generateSecretKey(length) {
  return crypto.randomBytes(length).toString("hex");
}

const jwtSecret = generateSecretKey(32);
const sessionSecret = generateSecretKey(32);

console.log("JWT_SECRET:", jwtSecret);
console.log("SESSION_SECRET:", sessionSecret);
