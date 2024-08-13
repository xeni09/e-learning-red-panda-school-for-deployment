const getUser = (req, res) => {
  // Aquí iría la lógica para obtener la información del usuario
  res.send("User information");
};

const updateUser = (req, res) => {
  // Aquí iría la lógica para actualizar la información del usuario
  res.send("User updated");
};

module.exports = {
  getUser,
  updateUser,
};
