const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  valid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // El token expirará automáticamente después de una hora (ajusta según tus necesidades)
  },
});

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
