const http = require("http");
const fs = require("fs");
const Logger = require("./utils/Logger");
const app = require("./app");

// Configurar puerto
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
Logger.info("Servidor HTTP en uso, Render aplicará HTTPS.");

// Iniciar servidor en el puerto correcto
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Manejar eventos del servidor
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case "EACCES":
      Logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      Logger.error(`${bind} is already in use`);
      process.exit(1);

    default:
      throw error;
  }
});

server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  Logger.info(`Listening on ${bind}`);
});
