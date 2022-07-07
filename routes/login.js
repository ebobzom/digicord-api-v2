const express = require('express');
const { loginValidation } = require('../validations/login');
const { login } = require('../controllers/login');

const loginRouter = express.Router();

loginRouter.post('/login', loginValidation, login);

module.exports = loginRouter;