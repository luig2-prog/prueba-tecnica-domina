const express = require('express');
const router = express.Router();

module.exports = (app, authController) => {
  app.use('/auth', router);

  router.post('/register', authController.register.bind(authController));
  router.post('/login', authController.login.bind(authController));
};