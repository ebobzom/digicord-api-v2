const { check } = require('express-validator');

exports.patientSignupValidation = [
    check('firstName').isString(),
    check('firstName').isLength({ max: 20 }).withMessage('first name must be less then 20 characters'),
    check('lastName').isString(),
    check('lastName').isLength({ max: 20 }).withMessage('last name must be less then 20 characters'),
    check('phoneNumber').isString(),
    check('phoneNumber').isLength({ max: 20 }).withMessage('phone number must be less then 20 characters'),
    check('age').isNumeric().withMessage('age requireds a numeric value'),
    check('sex').isString().withMessage('sex field is required'),
    check('location').isString(),
    check('location').isLength({ max: 100 }).withMessage('location field must be less then 30 characters'),
    check('email').isEmail().withMessage('invalid email format'),
    check('password').isLength({ min: 5 }).withMessage('password field must be more than 5 and less than 16 characters'),
    check('confirmPassword').isLength({ min: 5 }).withMessage('confirm password field must be more than 5 and less than 16 characters')
]