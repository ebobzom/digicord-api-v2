const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const { validationResult } = require('express-validator');

exports.patientsRegister = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({
        status: false,
        body: errors.array()
      })
    }
  
    const {
      firstName, lastName, email, phoneNumber, age, sex, location, password, confirmPassword
    } = req.body;
  
    if(password !== confirmPassword){
      return res.status(400).json({
        status: false,
        body: 'passwords do not match'
      })
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      // store in database
      const newUser = await prisma.patient.create({
        data: {
            firstName, lastName, email, phoneNumber, age, sex, location, password: hashedPassword
        }
      });

      // remove password
      delete newUser.password;

      // generate token
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

      // add token to result
      newUser.token = token;

      return res.status(201).json({
        status: true,
        body: newUser
      });
  
    } catch (error) {
      
      if(error.code == 'P2002'){
        return res.status(400).json({
          status: false,
          body: 'user already exists, please login'
        })
      }
  
      return res.status(400).json({
        status: false,
        body: error.message
      })
    }
  }