const { check } = require('express-validator');

exports.loginValidation = [
    check('email').isEmail().withMessage('email is required'),
    check('password').isString().withMessage('email must be of type string'),
    check('password').isLength({ min: 5 }).withMessage('password field must be more than 5 and less than 16 characters'),
]