const express = require('express');
const { patientSignupValidation } = require('../validations/patients');
const { patientsRegister } = require('../controllers/patients');

const patientRouter = express.Router();

patientRouter.post('/register', patientSignupValidation, patientsRegister);

module.exports = patientRouter;