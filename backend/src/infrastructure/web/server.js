const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  return app;
}

module.exports = createServer;