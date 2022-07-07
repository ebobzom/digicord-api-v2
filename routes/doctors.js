const express = require('express');
const { doctorSignupValidation } = require('../validations/doctors');
const { doctorsRegister } = require('../controllers/doctors');

const doctorRouter = express.Router();

doctorRouter.post('/register', doctorSignupValidation, doctorsRegister);

module.exports = doctorRouter;