const Logger = {
  log: (message) => {
    console.log(message);
  },
  info: (message) => {
    console.log(`INFO: ${message}`);
  },
  error: (message) => {
    console.error(`ERROR: ${message}`);
  },
};

module.exports = Logger;
